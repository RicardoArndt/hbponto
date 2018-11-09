import { Action } from "../interfaces/action";
import { User } from "../../models/user.model";

export enum UserActions {
    GET_USERS = "[Users] Users"
}

export class GetUsers implements Action {
    readonly type = UserActions.GET_USERS;
    constructor(public payload: User[]) { }
}