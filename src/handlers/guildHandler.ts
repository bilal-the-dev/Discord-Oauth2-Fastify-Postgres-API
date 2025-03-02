import { FastifyRequest } from "fastify";

import { fetchUserGuildsOauth } from "../utils/discordOauth.js";
import { manipulateUserGuilds } from "../bot/clientFunctions.js";

export const sendDiscordUserGuilds = async (req: FastifyRequest) => {
  const guilds = await fetchUserGuildsOauth(
    req.dbUser.accesstoken,
    req.discordUser.id
  );

  const manipulatedGuilds = manipulateUserGuilds(guilds);

  return { status: "success", data: manipulatedGuilds };
};
