import {HandlerSelectionResult, Result} from "../types/types";

export function log<T>(input: T): T {
  console.log(`LOG: ${JSON.stringify(input)}`)
  return input;
}

export function logWithPrefix<T>(prefix: string): (input: T) => T {
  return (input: T) => {
    console.log(`${prefix}${JSON.stringify(input)}`)
    return input;
  }
}

export function logMessage<T>(msg: string): (input: T) => T {
  return (input: T) => {
    console.log(msg)
    return input;
  }
}

export function logResult<V, E>(successMsg: string, failMsg: string): (res: Result<V, E>) => Result<V, E> {
  return (res) => {
    console.log(res.type === "successResult" ? successMsg : failMsg)
    return res;
  }
}

export function logHandler(): (input: HandlerSelectionResult) => HandlerSelectionResult {
  return (input) => {
    if (input.type === "failureResult") {
      return input;
    }
    const {handler, interaction} = input.value
    console.log(`Handler "${handler.name}" found for interaction ${interaction.data?.name}`)
    return input;
  }
}