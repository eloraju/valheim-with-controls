import {RequestParseResult, RequestValidationResult} from "../types/types";
import {DiscordInteraction} from "../types";
import {failWith, succeedWith} from "../types/type.helpers";

export function parseRequestBody(validationResult: RequestValidationResult): RequestParseResult {
    if (validationResult.type === "failureResult") {
        return validationResult;
    }
    const event = validationResult.value;
    const bodyStr = event.body || "";
    if (bodyStr === "") {
        // Should not ever get to here since the verification will throw with an empty body
        return failWith("Empty request body")
    }

    try {
        const interaction: DiscordInteraction = JSON.parse(bodyStr);
        return succeedWith(interaction);
    } catch (e) {
        return failWith(`Request parsing fialed:  ${e.message}`);
    }

}