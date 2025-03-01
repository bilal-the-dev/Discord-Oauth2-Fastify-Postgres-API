import Fastify from "fastify";
import cookie from "@fastify/cookie";

import pg from "./database/pg.js";
import "./database/tables.js";

import globalDefaultErrorHandler from "./handlers/errorHandler.js";

const fastify = Fastify({
  // logger: true,
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

fastify.all("*", () => ({
  status: "error",
  message: "Are you sure this is what you are looking for?",
}));

fastify.setErrorHandler(globalDefaultErrorHandler);

export default fastify;
