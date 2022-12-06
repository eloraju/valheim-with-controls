import {DiscordCommandType, DiscordCommandWithHandler, DiscordInteraction, DiscordInteractionResponse,} from "../types";
import {InteractionResponseType} from "discord-interactions";

export const testCommand: DiscordCommandWithHandler = {
  name: "test",
  type: DiscordCommandType.CHAT_INPUT,
  description: "Just a test command",
  handler: async function testHandler(interaction: DiscordInteraction): Promise<DiscordInteractionResponse> {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `This is a test function. Stop calling it. That means you ${interaction.member?.nick}`
      }
    }
  }
}
