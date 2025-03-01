import { User as discordUser } from "discord-oauth2";
import postgres from "postgres";
import { User } from "./types.js";

// Module augmentation for extending fasitfy class [with ts, you can mix interface - interface, class - interface NOT class - class unless mixin]
declare module "fastify" {
  interface FastifyInstance {
    pg: postgres.Sql;
  }
  interface FastifyRequest {
    dbUser: User;
    discordUser: discordUser;
  }
}
