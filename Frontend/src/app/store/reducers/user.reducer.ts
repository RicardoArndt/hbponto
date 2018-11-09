import { Action } from "../interfaces/action";
import { Map, fromJS } from "immutable";
import { BaseActions } from "../actions/base.action";
import { UserActions } from "../actions/user.action";
import { USER_INITIAL_STATE } from "../states/user.state";

class UserReducer {
    constructor(private state, private action) { }

    getUsers() {
        return this.state.merge({
            'Users': this.action.payload
        })
    }

    failure() {
        return this.state.merge({
            'Users': null 
        })
    }
}

export function usersReducer(state: Map<string, any> = fromJS(USER_INITIAL_STATE), action: Action): Map<string, any> {
    var userReducerObj: UserReducer = new UserReducer(state, action);

    switch(action.type) {
        case UserActions.GET_USERS : return userReducerObj.getUsers();
        case BaseActions.FAILURE : return userReducerObj.failure();
        default : return state;
    }
}