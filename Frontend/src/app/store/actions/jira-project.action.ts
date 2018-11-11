
import { Action } from "../interfaces/action";
import { ProjectsResponse, SprintsResponse, IssueFields, WorklogRegister } from "../../models/jira-projects.model";

export enum JiraProjectActions {
    GET_PROJECTS = "[JiraProject] Projects",
    GET_SPRINTS = "[JiraProject] Sprints",
    GET_ISSUES = "[JiraProject] Issues",
    POST_WORKLOG = "[JiraProject] WorklogRegister"
}

export class GetProjects implements Action {
    readonly type = JiraProjectActions.GET_PROJECTS;
    constructor(public payload: ProjectsResponse) { }
}

export class GetSprints implements Action {
    readonly type = JiraProjectActions.GET_SPRINTS;
    constructor(public payload: SprintsResponse) { }
}

export class GetIssues implements Action {
    readonly type = JiraProjectActions.GET_ISSUES;
    constructor(public payload: IssueFields[]) { }
}

export class PostWorklog implements Action {
    readonly type = JiraProjectActions.POST_WORKLOG;
    constructor(public payload: WorklogRegister) { }
}

export type JiraProjectsAllTypes = GetProjects | GetSprints | GetIssues | PostWorklog