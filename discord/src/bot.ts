import {
  ChatInputCommandInteraction,
  Client,
  Collection,
  Events,
  GatewayIntentBits,
} from "discord.js";
import * as env from "dotenv";
import { getCommand } from "./commands";

env.config();

const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const commandInter = interaction as ChatInputCommandInteraction;

  const command = getCommand(commandInter.commandName);

  if (command === null) {
    await interaction.reply({
      content: `Command ${commandInter.commandName} does not exists`,
      ephemeral: true,
    });
    return;
  }

  try {
    const response = await command.run(interaction);
    interaction.reply(response);
  } catch (e) {
    console.error(e);
    await interaction.reply({
      content: "Error handling command",
      ephemeral: true,
    });
  }
});

// Log in to Discord with your client's token
client.login(TOKEN);
