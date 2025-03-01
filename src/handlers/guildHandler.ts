import { FastifyRequest } from "fastify";

import { fetchUserGuildsOauth } from "../utils/discordOauth.js";

export const sendDiscordUserGuilds = async (req: FastifyRequest) => {
  const guilds = await fetchUserGuildsOauth(
    req.dbUser.accesstoken,
    req.discordUser.id
  );

  const ADMIN_BIT = 0x0000000000000008;

  guilds.forEach((g) => {
    if (g.permissions && (Number(g.permissions) & ADMIN_BIT) == ADMIN_BIT) {
      g.isAdmin = true;
    }
  });
  return { status: "success", data: guilds };
};
