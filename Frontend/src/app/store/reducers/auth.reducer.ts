import { Action } from "../interfaces/action";
import { AuthActions } from "../actions/auth.action";
import { Map, fromJS } from "immutable";
import { INITIAL_STATE } from "../states/auth.state";

class AuthReducer {
    constructor(private state, private action) { }

    loginSuccess() {
        return this.state.merge({
            'UserName': this.action.payload.UserName,
            'Token': this.action.payload.Token,
            'IsAuthenticated': true
        })
    }

    loginFailure() {
        return this.state.merge({
            'UserName': this.action.payload.UserName,
            'Token': this.action.payload.Token,
            'IsAuthenticated': false,
            'Error': this.action.payload.Error
        })
    }
}

export function authReducer(state: Map<string, any> = fromJS(INITIAL_STATE), action: Action): Map<string, any> {
    var authReducerObj: AuthReducer = new AuthReducer(state, action);

    switch(action.type) {
        case AuthActions.LOGIN_SUCCESS : return authReducerObj.loginSuccess();
        case AuthActions.LOGIN_FAILURE : return authReducerObj.loginFailure();
        case AuthActions.LOGOUT : return state;
        default : return state;
    }
}