import commands from '../..//src/commands';
import {DiscordCommand} from "../../src/types";
import axios from 'axios';
const commandsWithoutHandler: DiscordCommand[] = Array.from(commands.values());

const { TOKEN, CLIENT_ID, GUILD_ID, APPLICATION_ID } = process.env;
if(!TOKEN) {
  console.error("TOKEN not set");
  process.exit(1);
}
if(!CLIENT_ID) {
  console.error("CLIENT_ID not set");
  process.exit(1);
}
if(!GUILD_ID) {
  console.error("GUILD_ID not set");
  process.exit(1);
}

if(!APPLICATION_ID) {
  console.error("APPLICATION_ID not set");
  process.exit(1);
}

const endpointUrl = `https://discord.com/api/v10/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands`