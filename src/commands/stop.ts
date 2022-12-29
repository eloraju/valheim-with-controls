import {DiscordCommandType, DiscordCommandWithHandler, DiscordInteraction, DiscordInteractionResponse,} from "../types";
import {InteractionResponseType} from "discord-interactions";
import {instance as axios} from '../helpers/axiosIns';

export const stopCommand: DiscordCommandWithHandler = {
  name: "stop",
  type: DiscordCommandType.CHAT_INPUT,
  description: "Stops the server if there are no players",
  handler: async function stopHandler(interaction: DiscordInteraction): Promise<DiscordInteractionResponse> {
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
