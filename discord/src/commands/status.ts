import {DiscordCommandType, DiscordCommandWithHandler, DiscordInteraction, DiscordInteractionResponse,} from "../types";
import {InteractionResponseType} from "discord-interactions";
import axios from 'axios';

export const testCommand: DiscordCommandWithHandler = {
  name: "status",
  type: DiscordCommandType.CHAT_INPUT,
  description: "Reports the status of the server",
  handler: async function testHandler(interaction: DiscordInteraction): Promise<DiscordInteractionResponse> {
    const res = await axios.get("https://api.chucknorris.io/jokes/random")
    const joke = res.data.value
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `Not implemented yet. Meanwhile you can enjoy this Chuck Norris choke.\n ${joke}`
      }
    }
  }
}
