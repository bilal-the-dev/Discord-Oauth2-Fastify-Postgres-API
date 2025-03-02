import { FastifyInstance } from "fastify";

import { sendDiscordUserGuilds } from "../handlers/guildHandler.js";
import customFastify from "../utils/customFastfiy.js";

async function routes(fastify: FastifyInstance) {
  customFastify({
    fastify,
    path: "/@me",
    fieldName: "guilds",
    type: "get",
    handler: sendDiscordUserGuilds,
  });
}

export default routes;
