import {APIGatewayEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {verifyRequest} from "./functions/verifyRequest";
import {selectHandler} from "./functions/selectHandler";
import {buildResponse, executeHandler,} from "./functions/respond";
import {eventPipe} from "./functions/pipes";
import {parseRequestBody} from "./functions/eventBodyParser";
import {HandlerExecutionResult} from "./types/types";
import {logHandler, logMessage, logWithPrefix} from "./functions/log";

export async function main(event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> {
    const tag = new Date().getTime().toString(16);
    const pipeline = eventPipe(
        logMessage<APIGatewayEvent>(`==================== [${tag}] EVENT START ====================`),
        logWithPrefix<APIGatewayEvent>("Request: "),
        verifyRequest,
        parseRequestBody,
        selectHandler,
        logHandler,
        executeHandler,
        logWithPrefix<HandlerExecutionResult>("Response: "),
        buildResponse,
        logMessage<APIGatewayProxyResult>(`==================== [${tag}] EVENT END ======================`)
    )
    return await pipeline(event);
}
