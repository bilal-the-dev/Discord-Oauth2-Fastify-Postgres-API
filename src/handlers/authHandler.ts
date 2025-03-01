import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { discordAuthRequestQuery } from "../typings/types.js";
import AppError from "../structures/AppError.js";
import {
  getAccessTokenFromCode,
  getDiscordUserFromToken,
  isLoggedIn,
} from "../utils/discordOauth.js";
import { setJWTCookie } from "../utils/cookies.js";

export async function login(
  this: FastifyInstance,
  req: FastifyRequest<discordAuthRequestQuery>,
  reply: FastifyReply
) {
  const {
    query: { code },
    cookies,
  } = req;

  console.log({ code, cookies });

  if (!code && !cookies.JWT) throw new AppError("You are not logged in", 401);

  if (!code) {
    await isLoggedIn(this, req);
    return { status: "success", data: req.discordUser };
  }

  const data = await getAccessTokenFromCode(code);

  const discordUser = await getDiscordUserFromToken(data.access_token);

  const a = await this.pg`
    INSERT INTO users (userId, username, email, accessToken, refreshToken, expiresAt)
    VALUES (
      ${discordUser.id}, 
      ${discordUser.username}, 
      ${discordUser.email || null}, 
      ${data.access_token}, 
      ${data.refresh_token}, 
      ${Date.now() + data.expires_in}
    )
    ON CONFLICT (userId) DO UPDATE 
    SET username = ${discordUser.username},
        email = ${discordUser.email || null},
        accessToken = ${data.access_token}, 
        refreshToken = ${data.refresh_token},
        expiresAt = ${Date.now() + data.expires_in}
  `;

  console.log(a);

  setJWTCookie(discordUser, req, reply);
}

export const logout = (
  _: FastifyRequest<discordAuthRequestQuery>,
  reply: FastifyReply
) => {
  reply.cookie("JWT", "loggedout", {
    expires: new Date(Date.now() - 1000),
  });
  return { status: "success" };
};

export async function protect(this: FastifyInstance, req: FastifyRequest) {
  await isLoggedIn(this, req);
}
