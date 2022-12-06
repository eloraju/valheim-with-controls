import {LambdaHandler} from "./types";
import {InteractionResponseType, verifyKey} from "discord-interactions";
import {
  GetParameterCommand,
  GetParametersByPathCommand,
  GetParametersByPathCommandOutput,
  SSMClient
} from "@aws-sdk/client-ssm";

function respond(body: any, statusCode = 200) {
  const type = typeof body === "string" ? "text/plain" : "application/json";
  return {
    statusCode,
    headers: {"Content-Type": type},
    body
  }
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

export const handler: LambdaHandler = async (event, context) => {
  // Fetch the public key from param store
  const CLIENT_PUBLIC_KEY = await getParam("demo", "CLIENT_PUB_KEY");
  // Verify the discord key
  const signature = event.headers['X-Signature-Ed25519!'] || "";
  const timestamp = event.headers['X-Signature-Timestamp'] || "";
  const isValidRequest = verifyKey(event.body || "", signature, timestamp, CLIENT_PUBLIC_KEY);
  if (!isValidRequest) {
    return respond("Bad request signature", 401)
  }

  return respond({type: InteractionResponseType.PONG})
};
