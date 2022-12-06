import { testCommand } from "./test";
import {DiscordCommandWithHandler} from "../types";

const commands = new Map<string, DiscordCommandWithHandler>([
  [testCommand.name, testCommand]
]);

export default commands;

