import {Runtime} from "aws-cdk-lib/aws-lambda";
import {App, Stack, StackProps} from "aws-cdk-lib"
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {PolicyStatement} from "aws-cdk-lib/aws-iam";
import {LambdaIntegration, RestApi} from "aws-cdk-lib/aws-apigateway";

export class CommandLambdasStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "valtsu-bot-api", {
      restApiName: "Valheim Discord bot api",
      description: "This services handles the calls to the Valheim server control api sent from discord",
    });

    const handlerLamba = new NodejsFunction(this, `ValtsuBot`, {
      //timeout: Duration.seconds(5),
      //memorySize: 256,
      entry: 'src/valtsu.ts',
      runtime: Runtime.NODEJS_18_X,
      handler: "main",
    });

    // Allow lambda function to access param store
    const ssmPolicy = new PolicyStatement({
      resources: ["arn:aws:ssm:*:*:parameter/valtsu-bot/*"],
      actions: ["ssm:GetParameter"]
    });
    handlerLamba.addToRolePolicy(ssmPolicy)

    api.root
      .resourceForPath('/handle')
      .addMethod("POST", new LambdaIntegration(handlerLamba))
  }
}