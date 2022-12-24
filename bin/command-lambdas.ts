#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CommandLambdasStack } from "../lib/command-lambdas-stack";

const app = new cdk.App();
new CommandLambdasStack(app, "CommandLambdasStack");
