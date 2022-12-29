import {HandlerExecutionResult, HandlerSelectionResult} from "../types/types";
import {failWith, succeedWith} from "../types/type.helpers";
import {APIGatewayProxyResult} from "aws-lambda";

export async function executeHandler(handlerAndDataResult: HandlerSelectionResult): Promise<HandlerExecutionResult> {
    if (handlerAndDataResult.type === "failureResult") {
        return handlerAndDataResult;
    }
    const {handler, interaction} = handlerAndDataResult.value;
    try {
        return succeedWith(await handler(interaction))
    } catch (e) {
        return failWith(`Handler failed: ${e.message}`);
    }
}

export function buildResponse(result: HandlerExecutionResult): APIGatewayProxyResult {
    if (result.type === "failureResult") {
        const errorResponse = {
            statusCode: 400,
            headers: {"Content-Type": "text/plain"},
            body: result.error
        };

        if (result.error === "Bad request signature") {
            errorResponse.statusCode = 401;
        }
        return errorResponse
    }

    const body = result.value.data;
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    };

    return response;
}