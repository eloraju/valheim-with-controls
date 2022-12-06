import {Stage} from "../types";
import {GetParameterCommand, SSMClient} from "@aws-sdk/client-ssm";

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
