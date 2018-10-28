
import { Action } from "../interfaces/action";
import { ProjectsResponse, SprintsResponse } from "../../models/jira-projects.model";

export enum JiraProjectActions {
    GET_PROJECTS = "[JiraProject] Projects",
    GET_SPRINTS = "[JiraProject] Sprints"
}

export class GetProjects implements Action {
    readonly type = JiraProjectActions.GET_PROJECTS;
    constructor(public payload: ProjectsResponse) { }
}

export class GetSprints implements Action {
    readonly type = JiraProjectActions.GET_SPRINTS;
    constructor(public payload: SprintsResponse) { }
}

export type JiraProjectsAllTypes = GetProjects | GetSprints