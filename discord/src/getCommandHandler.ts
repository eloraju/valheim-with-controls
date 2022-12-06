import {DiscordInteraction, HandlerResult, InteractionHandler} from "./types";
import {pingHandler} from "./interactionHandlers/ping";
import {InteractionType} from "discord-interactions";
import {testHandler} from "./interactionHandlers/test";

const handlers = new Map<string, InteractionHandler>([
  ["test", testHandler]
])

export function getCommandHandler(interaction:DiscordInteraction): InteractionHandler {
  const interactionName = interaction.data?.name || "";
  if(interactionName && interaction.type === InteractionType.APPLICATION_COMMAND) {
    const func = handlers.get(interactionName);
    if(func === undefined) {
      return pingHandler;
    }
    return func;
  }

  return pingHandler;
}