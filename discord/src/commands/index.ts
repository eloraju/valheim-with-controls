import { testCommand } from "./test";
import {DiscordCommandWithHandler} from "../types";
import {statusCommand} from "./status";
import {startCommand} from "./start";
import {stopCommand} from "./stop";
const commands = new Map<string, DiscordCommandWithHandler>([
  [testCommand.name, testCommand],
  [statusCommand.name, statusCommand],
  [startCommand.name, startCommand],
  [stopCommand.name, stopCommand]
]);

export default commands;

