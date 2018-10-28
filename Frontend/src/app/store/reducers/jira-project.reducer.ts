import { Action } from "../interfaces/action";
import { Map, fromJS } from "immutable";
import { INITIAL_STATE } from "../states/jira-project";
import { JiraProjectActions } from "../actions/jira-project.action";
import { BaseActions } from "../actions/base.action";

class JiraProjectReducer {
    constructor(private state, private action) { }

    projects() {
        return this.state.merge({
            'Projects': this.action.payload.values
        })
    }

    sprints() {
        return this.state.merge({
            'Sprints': this.action.payload.values
        })
    }

    failure() {
        return this.state.merge({})
    }
}

export function jiraProjectReducer(state: Map<string, any> = fromJS(INITIAL_STATE), action: Action): Map<string, any> {
    var jiraReducerObj: JiraProjectReducer = new JiraProjectReducer(state, action);

    switch(action.type) {
        case JiraProjectActions.GET_PROJECTS : return jiraReducerObj.projects();
        case JiraProjectActions.GET_SPRINTS: return jiraReducerObj.sprints();
        case BaseActions.FAILURE : return jiraReducerObj.failure();
        default : return state;
    }
}