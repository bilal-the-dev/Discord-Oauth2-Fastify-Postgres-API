import DiscordOauth2 from "discord-oauth2";
import jwt, { JwtPayload } from "jsonwebtoken";
import { FastifyInstance, FastifyRequest } from "fastify";

import AppError from "../structures/AppError.js";
import { User } from "../typings/types.js";

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

let discordAPICache = new Map<
  string,
  {
    discordOauthUser: DiscordOauth2.User;
    discordUserGuilds?: Array<DiscordOauth2.PartialGuild>;
  }
>();

const oauth2Options = {
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
};
const oauth = new DiscordOauth2(oauth2Options);

export const getAccessTokenFromCode = async (
  code: string
): Promise<DiscordOauth2.TokenRequestResult> => {
  const res = await oauth
    .tokenRequest({
      code,
      scope: "identify guilds email",
      grantType: "authorization_code",
    })
    .catch((e: DiscordOauth2.DiscordHTTPError) => e);

  if (res instanceof DiscordOauth2.DiscordHTTPError)
    throw new AppError("The authorization code is not valid", 401);

  if (!res.access_token) throw new AppError("Something went wrong", 500);

  return res;
};

export const getDiscordUserFromToken = async (
  accessToken: string
): Promise<DiscordOauth2.User> => {
  const res = await oauth
    .getUser(accessToken)
    .catch((e: DiscordOauth2.DiscordHTTPError) => e);

  if (res instanceof DiscordOauth2.DiscordHTTPError)
    throw new AppError("Could not get user profile unauthorized", 401);

  return res;
};

export const fetchUserGuildsOauth = async (
  accessToken: string,
  userId: string
): Promise<DiscordOauth2.PartialGuild[]> => {
  const apiResult = discordAPICache.get(userId)!;

  // Checking with apiResult?.discordUserGuilds because this code runs after every request when Oauth user is fetched so it can API result can be never be null
  if (!apiResult.discordUserGuilds) {
    console.log("Getting User Guilds from API");

    const res = await oauth
      .getUserGuilds(accessToken)
      .catch((e: DiscordOauth2.DiscordHTTPError) => e);

    if (res instanceof DiscordOauth2.DiscordHTTPError)
      throw new AppError("Could not get user guilds unauthorized", 401);
    apiResult.discordUserGuilds = res;

    discordAPICache.set(userId, { ...apiResult });
  }

  return apiResult.discordUserGuilds;
};

export const isLoggedIn = async (
  fastifyInstance: FastifyInstance,
  req: FastifyRequest
) => {
  // 1) Getting token and check of it's there

  if (!req.cookies.JWT)
    throw new AppError(
      "You are not logged in! Please log in to get access.",
      401
    );

  // 2) Verification token
  const decoded = jwt.verify(
    req.cookies.JWT,
    process.env.JWT_SECRET
  ) as JwtPayload;

  // 3) Check if user still exists
  const [currentUser]: [User?] =
    await fastifyInstance.pg`SELECT * from users where userId = ${decoded.userId}`;

  console.log(currentUser);

  if (!currentUser)
    throw new AppError(
      "The user belonging to this token does no longer exist.",
      401
    );

  let apiResult = discordAPICache.get(currentUser.userid);

  // Not checking with apiResult?.discordOauthUser because this code runs before every request and it is 100% sure if cache was deleted the api result is null
  if (!apiResult) {
    console.log("Getting Oauth user from API");

    apiResult = {
      discordOauthUser: await getDiscordUserFromToken(currentUser.accesstoken),
    };

    discordAPICache.set(currentUser.userid, {
      ...apiResult,
    });
  }

  req.dbUser = currentUser;
  req.discordUser = apiResult.discordOauthUser;
};

setInterval(() => {
  discordAPICache = new Map();
}, 1000 * 60 * 1);
