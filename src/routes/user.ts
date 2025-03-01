import { FastifyInstance } from "fastify";

import { sendDiscordUserObject } from "../handlers/userHandler.js";
import { protect } from "../handlers/authHandler.js";

async function routes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", protect);

  fastify.get("/@me", sendDiscordUserObject);
}

export default routes;
