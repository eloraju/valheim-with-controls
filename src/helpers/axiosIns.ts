import axios, {AxiosRequestConfig} from 'axios';
import {failWith, succeedWith} from "../types/type.helpers";
import {Result} from "../types/types";

export const instance = axios.create({decompress: false})

export async function get<Value>(url: string, config?: AxiosRequestConfig): Promise<Result<Value, string>> {
    try {
        const res = await instance.get<Value>(url, config);
        if(!res.data) {
            return failWith("Empty response");
        }

        return succeedWith(res.data);
    } catch(e) {
        return failWith(e.message);
    }
}