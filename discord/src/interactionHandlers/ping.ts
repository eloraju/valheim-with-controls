import {DiscordInteractionResponse,} from "../types";
import {InteractionResponseType} from "discord-interactions";

export function pingHandler(): DiscordInteractionResponse {
  return {
    type: InteractionResponseType.PONG
  }
}