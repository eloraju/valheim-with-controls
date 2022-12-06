import * as event from '../events/discord-event.json';
import {handler} from '../src/handler';
import {APIGatewayProxyEvent, Context} from "aws-lambda";

const testContext: Context = {
  awsRequestId: "1234",
  functionName: "Test",
  callbackWaitsForEmptyEventLoop: false,
  functionVersion: '1',
  invokedFunctionArn: 'test',
  logGroupName: 'test',
  logStreamName: 'test',
  memoryLimitInMB: '9999',
  getRemainingTimeInMillis(): number {
    return 999;
  },
  done(error?: Error, result?: any) {
  },
  fail(error: Error | string) {
  },
  succeed(messageOrObject: any) {
  }
}


describe("nice", () => {
  it("", async () => {
    const res = await handler(event as unknown as APIGatewayProxyEvent, testContext)
    expect(res).toEqual({});
  })
})

{"application_id":"1049056049795174451","id":"1049645924646916096","token":"aW50ZXJhY3Rpb246MTA0OTY0NTkyNDY0NjkxNjA5NjphamRnRTZlTXBUWlE0THM5OVg4aEV3Nk5vT2Y1c2lUbmpZNjRWTDdGdTJGd0RkUGhVNEtwcjcySXk0RldmNGQ2Wmt6d2RsOXVpS1lsQXVCOTNNWGZDcmdXTzI4aFlsSEpEVjBaTk1GRzJoZVNNWEd4bm5hVlFKbHp3ek45WWduNg","type":1,"user":{"avatar":"255ad7cc60922ad1bb3aac41ef70ddb0","avatar_decoration":null,"discriminator":"4448","id":"210328601231491072","public_flags":0,"username":"Yötyökyöpeli"},"version":1}