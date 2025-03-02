import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.on("ready", (readyClient) => {
  console.log(
    `${readyClient.user.username} (${readyClient.user.id}) is ready!`
  );
});

client.login(process.env.DISCORD_BOT_TOKEN)

export default client;
