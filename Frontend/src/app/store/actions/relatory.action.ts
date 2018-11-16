import { Action } from "../interfaces/action";
import { Relatory } from "../../models/relatory.model";

export enum RelatoryActions {
    GET_RELATORIES = "[Relatories] Relatories"
}

export class GetRelatories implements Action {
    readonly type = RelatoryActions.GET_RELATORIES;
    constructor(public payload: Relatory[]) { }
}

export type RelatoryAllTypes = GetRelatories