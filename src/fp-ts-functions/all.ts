import {APIGatewayEvent, APIGatewayProxyResult} from "aws-lambda";
import {Lazy, pipe} from 'fp-ts/function';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import {Stage} from "aws-cdk-lib";
import {AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders} from "axios";
import {instance as http} from "../helpers/axiosIns";
import {Parameter} from "@aws-sdk/client-ssm";
import {TaskEither, tryCatch} from "fp-ts/lib/TaskEither";
import {Either, toError} from "fp-ts/lib/Either";


function discordPipeline({body, headers}: {body: string, headers: Record<string, string>}) {
    return pipe(
        {event: {body, headers}},
        // validate request
        // fetch keys from param store
        )
}
interface ParamStoreArgs {
    paramName: string;
    stage: Stage;
    awsSessionToken: string;
}

function constructParamStoreRequest(input: ParamStoreArgs): AxiosRequestConfig<string> {
    return {
        method: "get",
        url: `http://localhost:2773/systemsmanager/parameter/get?name=${input.paramName}&withDecryption=true`,
        headers: ({['X-Aws-Parameters-Secrets-Token']: input.awsSessionToken}) as RawAxiosRequestHeaders
    }
}

function getParamStoreCall(config: AxiosRequestConfig): Lazy<Promise<AxiosResponse<Parameter>>> {
    return (): Promise<AxiosResponse<Parameter>> => {
        return http(config);
    }
}

function TEfromCall<A>(f: Lazy<Promise<A>>): TaskEither<Error, A> {
    return tryCatch(f, toError);
}

function parseAxiosResponse<A>(res: AxiosResponse<A>): TaskEither<Error, A> {
    return res.data
        ? TE.right(res.data)
        : TE.left(new Error("Unable to parse response. No data to parse"))
}

function getParamValue(param: Parameter): TaskEither<Error, string> {
    return param.Value
        ? TE.right(param.Value)
        : TE.left(new Error("SSM didn't return Value"))
}

function getSecretFromParamStore(input: ParamStoreArgs): TaskEither<Error,string> {
    return pipe(
        input,
        constructParamStoreRequest,
        getParamStoreCall,
        TEfromCall,
        TE.chain(parseAxiosResponse),
        TE.chain(getParamValue),
        )
}