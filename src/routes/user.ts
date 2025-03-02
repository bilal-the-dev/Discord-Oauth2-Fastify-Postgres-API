import { FastifyInstance } from "fastify";

import { sendDiscordUserObject } from "../handlers/userHandler.js";
import customFastify from "../utils/customFastfiy.js";

async function routes(fastify: FastifyInstance) {
  customFastify({
    fastify,
    path: "/@me",
    fieldName: "user",
    type: "get",
    handler: sendDiscordUserObject,
  });
}

export default routes;
