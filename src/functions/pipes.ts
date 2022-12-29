import {Promise as BPromise} from 'bluebird'
import {APIGatewayEvent, APIGatewayProxyResult} from "aws-lambda";

export function eventPipe(...fns: Function[]) {
    return async (input: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
        // Very hacky... There has to be a better way to make the types comply
        return BPromise.reduce(fns, (val, fn) => fn(val), input) as unknown as APIGatewayProxyResult;
    };
}

