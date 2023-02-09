import {APIGatewayEvent} from "aws-lambda";
import {getParam} from "./getParams";
import {verifyKey} from "discord-interactions";
import {failWith, succeedWith} from "../types/type.helpers";
import {RequestValidationResult} from "../types/types";

export async function verifyRequest(event: APIGatewayEvent): Promise<RequestValidationResult> {
    // Fetch the public key from param store
    // TODO: Check the stage from the event
    const CLIENT_PUBLIC_KEY = await getParam("demo", "CLIENT_PUB_KEY");
    // Verify the discord key

    // Create a function that checks the headers
    // these two were 'X-Signature-Ed25519!' and 'X-Signature-Timestamp'
    // in the documentation but all lowercase in the actual request...
    const signature = event.headers['x-signature-ed25519'] || "";
    const timestamp = event.headers['x-signature-timestamp'] || "";
    const res = verifyKey(event.body || "", signature, timestamp, CLIENT_PUBLIC_KEY);

    if(!res) {
        return failWith("Bad request signature");
    }

    return succeedWith(event)
}
