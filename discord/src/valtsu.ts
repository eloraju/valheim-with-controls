import {InteractionType, verifyKey} from "discord-interactions";
import {APIGatewayEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {getParam} from "./helpers/getParams";
import {DiscordInteraction, InteractionHandler} from "./types";
import {Logger} from "./helpers/logger";
import commands from "./commands";
import {notFoundHandler, pingHandler} from "./commands/commandlessHandlers";

const logger = new Logger();

export function getCommandHandler(interaction:DiscordInteraction): InteractionHandler {
  const interactionName = interaction.data?.name || "";
  if(interactionName && interaction.type === InteractionType.APPLICATION_COMMAND) {
    const command = commands.get(interactionName);
    if(command === undefined) {
      return notFoundHandler;
    }
    return command.handler;
  }

  return pingHandler;
}

async function verifyRequest(event: APIGatewayEvent): Promise<boolean> {
  // Fetch the public key from param store
  const CLIENT_PUBLIC_KEY = await getParam("demo", "CLIENT_PUB_KEY");
  // Verify the discord key

  // Create a function that checks the headers
  // these two were 'X-Signature-Ed25519!' and 'X-Signature-Timestamp'
  // in the documentation but all lowercase in the actual request...
  const signature = event.headers['x-signature-ed25519'] || "";
  const timestamp = event.headers['x-signature-timestamp'] || "";
  return verifyKey(event.body || "", signature, timestamp, CLIENT_PUBLIC_KEY);
}

function respond(body: any, statusCode = 200) {
  const type = typeof body === "string" ? "text/plain" : "application/json";
  const response = {
    statusCode,
    headers: {"Content-Type": type},
    body: JSON.stringify(body)
  };
  logger.log(`Response: ${JSON.stringify(response)}`)
  logger.end();
  return response;
}

export async function main(event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult>{
  logger.start();
  logger.log(`Request: ${JSON.stringify(event)}`)

  const isValidRequest = await verifyRequest(event);
  if (!isValidRequest) {
    logger.log("Invalid request")
    return respond("Bad request signature", 401)
  }

  const bodyStr = event.body || "";
  if(bodyStr === "") {
    // Should not ever get to here since the verification will throw with an empty body
    return respond("Empty request body", 400)
  }

  const interaction: DiscordInteraction = JSON.parse(bodyStr);

  const handlerFunction = getCommandHandler(interaction);
  logger.log(`Handler "${handlerFunction.name}" found for interaction ${interaction.data?.name}`)
  const result = await handlerFunction(interaction);

  return respond(result)
}
