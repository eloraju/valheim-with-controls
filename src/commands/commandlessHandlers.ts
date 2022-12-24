import {DiscordInteraction, DiscordInteractionResponse} from "../types";
import {InteractionResponseType} from "discord-interactions";

export async function pingHandler(): Promise<DiscordInteractionResponse> {
  return {
    type: InteractionResponseType.PONG
  }
}

export async function notFoundHandler(event: DiscordInteraction): Promise<DiscordInteractionResponse> {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `No handler found for "${event.data?.name}"`
    }
  }
}