import Fastify from "fastify";
import cookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";

import pg from "./database/pg.js";
import globalDefaultErrorHandler from "./handlers/errorHandler.js";

// Load Some Stuff
import "./database/tables.js";
import "./bot/client.js";

const fastify = Fastify({
  // logger: true,
});

await fastify.register(fastifyCors, {
  // put your options here
  credentials: true,
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
  origin: process.env.ALLOWED_ORIGINS.split(","),
});

fastify.register(cookie);

fastify.decorate("pg", pg);

fastify.register(import("./routes/discordAuth.js"), {
  prefix: "/api/auth/discord",
});

// Sort of middleware to authenticate user is logged in and adds few properties to req object

fastify.register(import("./routes/user.js"), {
  prefix: "/api/users",
});

fastify.register(import("./routes/guild.js"), {
  prefix: "/api/guilds",
});

fastify.setErrorHandler(globalDefaultErrorHandler);

export default fastify;
