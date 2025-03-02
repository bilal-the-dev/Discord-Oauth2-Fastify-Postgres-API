import { FastifyRequest } from "fastify";

export const sendDiscordUserObject = async (req: FastifyRequest) => {
  return req.discordUser;
};
