import { Action } from "../interfaces/action";
import { Map, fromJS } from "immutable";
import { INITIAL_STATE } from "../states/jira-project";
import { JiraProjectActions } from "../actions/jira-project.action";
import { BaseActions } from "../actions/base.action";

class JiraProjectReducer {
    constructor(private state, private action) { }

    projects() {
        return this.state.merge({
            'Id': this.action.payload.Id,
            'Name': this.action.payload.Name
        })
    }

    failure() {
        return this.state.merge({
            'Id': null,
            'Name': ''
        })
    }
}

export function jiraProjectReducer(state: Map<string, any> = fromJS(INITIAL_STATE), action: Action): Map<string, any> {
    var jiraReducerObj: JiraProjectReducer = new JiraProjectReducer(state, action);

    switch(action.type) {
        case JiraProjectActions.GET_PROJECTS : return jiraReducerObj.projects();
        case BaseActions.FAILURE : return jiraReducerObj.failure();
        default : return state;
    }
}