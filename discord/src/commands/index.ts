import {
  Interaction,
  InteractionReplyOptions,
  RESTPostAPIApplicationCommandsJSONBody,
  SlashCommandBuilder,
} from "discord.js";
import { create_server } from "./create-server";
import { test } from "./test";

export interface Command {
  meta: SlashCommandBuilder;
  run: (interaction: Interaction) => Promise<InteractionReplyOptions>;
}

const commands = new Map<string, Command>([
  ["create-server", create_server],
  ["test", test],
]);

export function getCommand(command: string): Command | null {
  return commands.get(command) ?? null;
}

export function getUpdatePayload(): RESTPostAPIApplicationCommandsJSONBody[] {
  return Array.from(commands.values()).map((c) => c.meta.toJSON());
}
