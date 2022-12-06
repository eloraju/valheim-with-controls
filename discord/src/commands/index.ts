import { testCommand } from "./test";
import {DiscordCommandWithHandler} from "../types";
import {statusCommand} from "./status";
const commands = new Map<string, DiscordCommandWithHandler>([
  [testCommand.name, testCommand],
  [statusCommand.name, statusCommand]
]);

export default commands;

