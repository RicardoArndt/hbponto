import { AuthUserResponse } from "../../models/auth-user.model";
import { Action } from "../interfaces/action";
import { CurrentUser } from "../../models/user.model";

export enum AuthActions {
    LOGIN_SUCCESS = "[Auth] LogIn Success",
    LOGIN_FAILURE = "[Auth] LogIn Failure",
    CURRENT_USER = "[Auth] Current",
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

export class CurrentUserAction implements Action {
    readonly type = AuthActions.CURRENT_USER;
    constructor(public payload: CurrentUser) { } 
}

export type AuthActionsTypesAll = LogInSuccess | LogInFailure | LogOut | CurrentUserAction