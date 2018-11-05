export class BaseRoute {
    readonly API = "http://localhost:50009/api/";
    public Authentication = this.API + "authentication";
    public Project = this.API + "jiraProject/"
    public GetAllProjects = this.Project + "projects";
    public GetSprints = this.Project + "sprints/";
    public Issue = this.Project + "issue/"
}