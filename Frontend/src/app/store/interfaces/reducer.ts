import { Action } from "./action";

export interface Reducer<T> {
    (state: T, action: Action): T;
}