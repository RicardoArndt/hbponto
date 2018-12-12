export class BaseRoute {
    // static readonly API = "http://90.0.0.113:5000/api/";
    static readonly API = "http://172.23.32.1:3000/api/";
    static readonly Authentication = BaseRoute.API + "authentication";
    static readonly Project = BaseRoute.API + "jiraProject/"
    static readonly GetAllProjects = BaseRoute.Project + "projects";
    static readonly GetSprints = BaseRoute.Project + "sprints/";
    static readonly Issue = BaseRoute.Project + "issue/";
    static readonly Users = BaseRoute.API + "user/";
    static readonly Roles = BaseRoute.Users + "roles";
    static readonly Relatories = BaseRoute.API + "relatory";
    static readonly UpdateIssues = BaseRoute.Issue + "update";
}