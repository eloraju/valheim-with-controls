import {DiscordInteraction, InteractionHandler} from "../types";
import {InteractionType} from "discord-interactions";
import commands from "../commands";
import {notFoundHandler, pingHandler} from "../commands/commandlessHandlers";
import {HandlerSelectionResult, InterractionAndHandler, Result} from "../types/types";
import {succeedWith} from "../types/type.helpers";

export function selectHandler(interactionResult: Result<DiscordInteraction, string>): HandlerSelectionResult {
    if(interactionResult.type === "failureResult") {
        return interactionResult;
    }
    const interaction = interactionResult.value;
    const interactionName = interaction.data?.name || "";
    if (interactionName && interaction.type === InteractionType.APPLICATION_COMMAND) {
        const command = commands.get(interactionName);
        if (command === undefined) {
            return succeedWith({ handler:notFoundHandler, interaction});
        }
        return succeedWith({handler: command.handler, interaction});
    }

    return succeedWith({handler: pingHandler, interaction});
}