export class BaseRoute {
    readonly API = "http://localhost:50010/api/";
    public Authentication = this.API + "authentication";
    public Project = this.API + "jiraProject/"
    public GetAllProjects = this.Project + "projects";
    public GetSprints = this.Project + "sprints/";
    public Issue = this.Project + "issue/"
    public Users = this.API + "user/"
    public Roles = this.Users + "roles"
}