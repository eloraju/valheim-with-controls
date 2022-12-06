import {DiscordInteraction, DiscordInteractionResponse,} from "../types";
import {InteractionResponseType} from "discord-interactions";

export function testHandler(interaction: DiscordInteraction): DiscordInteractionResponse {

  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,

  }
}
