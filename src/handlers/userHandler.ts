import { FastifyRequest } from "fastify";

export const sendDiscordUserObject = (req: FastifyRequest) => {
  return { status: "success", data: req.discordUser };
};
