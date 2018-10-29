import { ProjectsResponse, SprintsResponse, IssuesReponse } from "../../models/jira-projects.model";

export interface JiraProjectState {
    Projects?: ProjectsResponse;
    Sprints?: SprintsResponse;
    Issues?: IssuesReponse;
}

export const INITIAL_STATE: JiraProjectState = {
    Projects: null,
    Sprints: null,
    Issues: null
}
