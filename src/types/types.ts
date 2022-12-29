import {APIGatewayEvent} from "aws-lambda";
import {DiscordInteraction, DiscordInteractionResponse, InteractionHandler} from "../types";

export type Error =
    "Bad request signature" |
    "Empty response" |
    "SSM returned empty string" |
    string


export type Success<Value> = {
    type: "successResult",
    value: Value
}

export type Failure = {
    type: "failureResult",
    error: Error
}
export type Result<Value, Error> = Success<Value> | Failure


export type Some<Value> = {
    type: "someResult",
    value: Value
}

export type None = {
    type: "noneResult"
}

export type Maybe<Value> = Some<Value> | None

export type InteractionAndHandler = {
    interaction: DiscordInteraction,
    handler: InteractionHandler
}

export type RequestValidationResult = Success<APIGatewayEvent> | Failure
export type RequestParseResult = Success<DiscordInteraction> | Failure
export type HandlerSelectionResult = Success<InteractionAndHandler> | Failure
export type HandlerExecutionResult = Success<DiscordInteractionResponse> | Failure