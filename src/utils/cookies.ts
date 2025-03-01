import OAuth from "discord-oauth2";
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export const setJWTCookie = (
  user: OAuth.User,
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  reply.cookie("JWT", token, {
    path: "/",

    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN_DAYS) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure:
      req.protocol === "https" || req.headers["x-forwarded-proto"] === "https",
  });

  reply.send({ status: "success", data: user });
};
