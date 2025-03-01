import { FastifyInstance } from "fastify";

import { protect } from "../handlers/authHandler.js";
import { sendDiscordUserGuilds } from "../handlers/guildHandler.js";

async function routes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", protect);

  fastify.get("/@me", sendDiscordUserGuilds);
}

export default routes;
