import {DiscordCommandType, DiscordCommandWithHandler, DiscordInteraction, DiscordInteractionResponse,} from "../types";
import {InteractionResponseType} from "discord-interactions";
import axios from '../helpers/axiosIns';

export const startCommand: DiscordCommandWithHandler = {
  name: "start",
  type: DiscordCommandType.CHAT_INPUT,
  description: "Starts the server if it's not already running",
  handler: async function startHandler(interaction: DiscordInteraction): Promise<DiscordInteractionResponse> {
    const res = await axios.get("https://api.chucknorris.io/jokes/random")
    const joke = res.data.value
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `Not implemented yet. Meanwhile you can enjoy this Chuck Norris joke. ${joke}`
      }
    }
  }
}
