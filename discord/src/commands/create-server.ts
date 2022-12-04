import { Interaction, SlashCommandBuilder } from "discord.js";
import { Command } from ".";

export const create_server: Command = {
  meta: new SlashCommandBuilder()
    .setName("start")
    .setDescription("starts valheim server if it's not already running"),
  async run(interaction: Interaction) {
    return { content: "It be working!" };
  },
};
