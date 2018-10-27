
import { Action } from "../interfaces/action";
import { ProjectsResponse } from "../../models/jira-projects.model";

export enum JiraProjectActions {
    GET_PROJECTS = "[JiraProject] Projects"
}

export class GetProjects implements Action {
    readonly type = JiraProjectActions.GET_PROJECTS;
    constructor(public payload: ProjectsResponse) { }
}

export type JiraProjectsAllTypes = GetProjects