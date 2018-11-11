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
            'UserId': this.action.payload.UserId,
            'IsAuthenticated': true
        })
    }

    loginFailure() {
        return this.state.merge({
            'UserName': this.action.payload.UserName,
            'Token': this.action.payload.Token,
            'UserId': this.action.payload.UserId,
            'IsAuthenticated': false,
            'Error': this.action.payload.Error
        })
    }

    currentUser() {
        return this.state.merge({
            'CurrentUser': this.action.payload
        })
    }
}

export function authReducer(state: Map<string, any> = fromJS(INITIAL_STATE), action: Action): Map<string, any> {
    var authReducerObj: AuthReducer = new AuthReducer(state, action);

    switch(action.type) {
        case AuthActions.LOGIN_SUCCESS : return authReducerObj.loginSuccess();
        case AuthActions.LOGIN_FAILURE : return authReducerObj.loginFailure();
        case AuthActions.CURRENT_USER : return authReducerObj.currentUser();
        case AuthActions.LOGOUT : return fromJS(INITIAL_STATE);
        default : return state;
    }
}