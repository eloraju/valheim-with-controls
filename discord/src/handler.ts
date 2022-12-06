import {InteractionResponseType, verifyKey} from "discord-interactions";
import {
  GetParameterCommand,
  SSMClient
} from "@aws-sdk/client-ssm";
import {APIGatewayEvent, APIGatewayProxyResult, Context} from "aws-lambda";

function respond(body: any, statusCode = 200) {
  const type = typeof body === "string" ? "text/plain" : "application/json";
  const response = {
    statusCode,
    headers: {"Content-Type": type},
    body: JSON.stringify(body)
  };
  console.log(`Rensponse: ${JSON.stringify(response)}`)
  console.log("==================== EVENT END ======================")
  return response;
}

export type Stage = '$default' | 'demo' | 'stage' | 'prod';

export async function getParam(stage: Stage, name: string): Promise<any> {
  const ssm = new SSMClient({region: 'eu-north-1'});
  const command = new GetParameterCommand({
    Name: `/valtsu-bot/${stage === "$default" ? "demo" : stage}/${name}`,
    WithDecryption: true
  });
  try {
    const res = await ssm.send(command);
    if (res && res.Parameter && res.Parameter.Value) {
      return res.Parameter.Value;
    } else return null;
  } catch (err) {
    console.log(`Error when fetching params from param store: ${JSON.stringify(err)}`);
    return null;
  }
}

export async function handler(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult>{
  // Fetch the public key from param store
  const CLIENT_PUBLIC_KEY = await getParam("demo", "CLIENT_PUB_KEY");
  // Verify the discord key

  console.log("==================== EVENT START ====================")
  // Create a function that checks the headers
  // these two were 'X-Signature-Ed25519!' and 'X-Signature-Timestamp'
  // in the documentation but all lowercase in the actual request...
  const signature = event.headers['x-signature-ed25519'] || "";
  const timestamp = event.headers['x-signature-timestamp'] || "";
  console.log(`Request: ${JSON.stringify(event)}`)
  const isValidRequest = verifyKey(event.body || "", signature, timestamp, CLIENT_PUBLIC_KEY);
  if (!isValidRequest) {
    return respond("Bad request signature", 401)
  }

  return respond({type: InteractionResponseType.PONG})
}
