import { AuthUserResponse } from "../../models/auth-user.model";
import { Action } from "../interfaces/action";

export enum AuthActions {
    LOGIN_SUCCESS = "[Auth] LogIn Success",
    LOGIN_FAILURE = "[Auth] LogIn Failure",
    LOGOUT = "[Auth] LogOut"
}

export class LogInSuccess implements Action {
    readonly type = AuthActions.LOGIN_SUCCESS;
    constructor(public payload: AuthUserResponse) { }
}

export class LogInFailure implements Action {
    readonly type = AuthActions.LOGIN_FAILURE;
    constructor(public payload: AuthUserResponse) { }
}

export class LogOut implements Action {
    readonly type = AuthActions.LOGOUT;
}

export type AuthActionsTypesAll = LogInSuccess | LogInFailure | LogOut