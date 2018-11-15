export class BaseRoute {
    readonly API = "http://192.168.2.5:3000/api/";
    readonly Authentication = this.API + "authentication";
    readonly Project = this.API + "jiraProject/"
    readonly GetAllProjects = this.Project + "projects";
    readonly GetSprints = this.Project + "sprints/";
    readonly Issue = this.Project + "issue/";
    readonly Users = this.API + "user/";
    readonly Roles = this.Users + "roles";
    readonly Relatories = this.API + "relatory";
    readonly UpdateIssues = this.Issue + "update";

}