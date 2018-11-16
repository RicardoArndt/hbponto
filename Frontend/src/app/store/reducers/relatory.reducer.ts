import { Action } from "../interfaces/action";
import { RelatoryActions } from "../actions/relatory.action";
import { BaseActions } from "../actions/base.action";
import { RELATORY_INITIAL_STATE } from "../states/relatory.state";
import { fromJS } from "immutable";

class RelatoryReducer {
    constructor(private state, private action) { }

    getRelatories() {
        return this.state.merge({
            'Relatories': this.action.payload
        })
    }

    failure() {
        return this.state.merge({
            'Relatories': null 
        })
    }
}

export function relatoryReducer(state: Map<string, any> = fromJS(RELATORY_INITIAL_STATE), action: Action): Map<string, any> {
    var relatoryReducerObj: RelatoryReducer = new RelatoryReducer(state, action);

    switch(action.type) {
        case RelatoryActions.GET_RELATORIES : return relatoryReducerObj.getRelatories();
        case BaseActions.FAILURE : return relatoryReducerObj.failure();
        default : return state;
    }
}