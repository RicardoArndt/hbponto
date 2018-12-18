import { ENV } from "../../../../environments/environment";

export class BaseRoute {
    // static readonly Authentication = ENV.API + "authentication";
    // static readonly Project = ENV.API + "jiraProject/"
    // static readonly GetAllProjects = BaseRoute.Project + "projects";
    // static readonly GetSprints = BaseRoute.Project + "sprints/";
    // static readonly Issue = BaseRoute.Project + "issue/";
    // static readonly Users = ENV.API + "user/";
    // static readonly Roles = BaseRoute.Users + "roles";
    // static readonly Relatories = ENV.API + "relatory";
    // static readonly UpdateIssues = BaseRoute.Issue + "update";


    static readonly Authentication = "authentication";
    static readonly Project = "jiraProject/"
    static readonly GetAllProjects = BaseRoute.Project + "projects";
    static readonly GetSprints = BaseRoute.Project + "sprints/";
    static readonly Issue = BaseRoute.Project + "issue/";
    static readonly Users = "user/";
    static readonly Roles = BaseRoute.Users + "roles";
    static readonly Relatories = "relatory";
    static readonly UpdateIssues = BaseRoute.Issue + "update";
}