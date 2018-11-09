import { Action } from "../interfaces/action";

export enum BaseActions {
    FAILURE = "[Failure] BadRequest"
}

export class Failure implements Action {
    readonly type = BaseActions.FAILURE;
    constructor(public payload: any) { }
}

export type BaseAllTypes = Failure