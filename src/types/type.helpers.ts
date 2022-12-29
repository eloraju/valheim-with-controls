// Result helper functions to wrap the values and errors in correct type
import {Failure, Result, Success, Error} from "./types";

export function failWith(error: Error): Failure {
    return {
        type: "failureResult",
        error
    }
}

export function succeedWith<Value>(value: Value): Success<Value> {
    return {
        type: "successResult",
        value
    }
}