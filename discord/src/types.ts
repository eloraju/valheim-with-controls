import {APIGatewayEvent, APIGatewayProxyResult, Context} from "aws-lambda";

export type LambdaHandler = <T>(event: APIGatewayEvent, context: Context) => Promise<APIGatewayProxyResult | void>