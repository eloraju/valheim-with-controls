import commands from '../..//src/commands';
import {DiscordCommand} from "../../src/types";
import axios from 'axios';

const commandsArr = Array.from(commands.values());

const {TOKEN, CLIENT_ID, GUILD_ID, APPLICATION_ID} = process.env;
if (!TOKEN) {
  console.error("TOKEN not set");
  process.exit(1);
}
if (!CLIENT_ID) {
  console.error("CLIENT_ID not set");
  process.exit(1);
}
if (!GUILD_ID) {
  console.error("GUILD_ID not set");
  process.exit(1);
}

if (!APPLICATION_ID) {
  console.error("APPLICATION_ID not set");
  process.exit(1);
}
// Using this endpoint treats already existing commands as upserts so no need to create another call
const endpointUrl = `https://discord.com/api/v10/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands`;
(async () => {
    for (const command of commandsArr) {
      delete command.handler;
      try {
        await axios.post(endpointUrl, command, {headers: {Authorization: `Bot ${TOKEN}`}});
        console.log(`"${command.name}" registered!`);
      } catch
        (e) {
        console.log(e.message);
        const msg = e.response.data.message;
        const errors = e.response.data.errors._errors.map((er: any) => er.message);
        console.error(`Error registering command "${command.name}": ${msg}\n Errors:`, errors);
      }
    }
    setTimeout(()=>{}, 1000);
  }
)
()
