import * as event from '../events/discord-event.json';
import {valtsu} from '../src/valtsu';
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
    // TODO: atm this makes actual calls to ssm:param store.... soo maybe fix that at some point?
    const res = await valtsu(event as unknown as APIGatewayProxyEvent, testContext)
    expect(res).toEqual({});
  })
})
