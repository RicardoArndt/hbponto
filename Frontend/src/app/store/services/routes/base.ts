export class BaseRoute {
    readonly API = "http://192.168.2.2:3000/api/";
    public Authentication = this.API + "authentication";
    public Project = this.API + "jiraProject/"
    public GetAllProjects = this.Project + "projects";
    public GetSprints = this.Project + "sprints/";
    public Issue = this.Project + "issue/"
    public Users = this.API + "user/"
    public Roles = this.Users + "roles"
}