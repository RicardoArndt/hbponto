import { ProjectsResponse, SprintsResponse } from "../../models/jira-projects.model";

export interface JiraProjectState {
    Projects?: ProjectsResponse;
    Sprints?: SprintsResponse;
}

export const INITIAL_STATE: JiraProjectState = {
    Projects: null
}
