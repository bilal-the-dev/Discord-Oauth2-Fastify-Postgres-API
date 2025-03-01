import { FastifyInstance } from "fastify";

import { login, logout } from "../handlers/authHandler.js";
import { discordAuthRequestQuery } from "../typings/types.js";

async function routes(fastify: FastifyInstance) {
  fastify.post<discordAuthRequestQuery>("/callback", login);
  fastify.post<discordAuthRequestQuery>("/logout", logout);
}

export default routes;
