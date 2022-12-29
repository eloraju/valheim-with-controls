import {Stage} from "../types";
import {GetParameterCommand, Parameter, SSMClient} from "@aws-sdk/client-ssm";
import {get} from '../helpers/axiosIns';
import {Result} from "../types/types";
import {failWith, succeedWith} from "../types/type.helpers";

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

/*
Aws extension layer ARN can be found from
https://docs.aws.amazon.com/secretsmanager/latest/userguide/retrieving-secrets_lambda.html#retrieving-secrets_lambda_ARNs
 */
export async function getCachedParam(stage: Stage, paramName: string): Promise<Result<string, string>> {
    // Localhost for internal aws call
    const url = "http://localhost:2773";
    // This should be set by aws and it should allow us to query param store if
    // if we've configured the permissions correctly
    const headers = {'X-Aws-Parameters-Secrets-Token': process.env.AWS_SESSION_TOKEN};
    const paramPath = `systemsmanager/parameter/get?name=${paramName}&withDecryption=true`

    const res = await get<Parameter>(`${url}/${paramPath}`, {headers});
    if (res.type === "failureResult") {
        return res;
    }

    if (res.value.Value && res.value.Value.length > 0)
        return succeedWith(res.value.Value);

    return failWith("SSM returned empty string")
}