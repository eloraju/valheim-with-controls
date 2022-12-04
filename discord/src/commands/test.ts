import { SlashCommandBuilder } from "discord.js";
import { Command } from ".";

export const test: Command = {
  meta: new SlashCommandBuilder()
    .setName("test")
    .setDescription("This is a test command"),
  async run() {
    return { content: "Test!", ephemeral: true };
  },
};
