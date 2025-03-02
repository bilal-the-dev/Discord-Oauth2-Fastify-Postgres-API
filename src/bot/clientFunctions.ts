import { PartialGuild } from "discord-oauth2";

import client from "./client.js";

export const manipulateUserGuilds = (
  userGuilds: PartialGuild[]
): PartialGuild[] => {
  const ADMIN_BIT = 0x0000000000000008;

  userGuilds.forEach((g) => {
    // Invite url for frontend
    g.inviteUrl = process.env.BOT_INVITE_URL.replace(
      "CLIENT_ID",
      process.env.CLIENT_ID
    ).replace("GUILD_ID", g.id);

    // Check if user is an admin there
    if (g.permissions && (Number(g.permissions) & ADMIN_BIT) == ADMIN_BIT) {
      g.isAdmin = true;
    }

    const botGuild = client.guilds.cache.get(g.id);

    if (botGuild) {
      g.isBotPresent = true;
      g.members = botGuild.memberCount;
    }
  });

  return userGuilds;
};
