export class BaseRoute {
    readonly API = "https://172.26.72.179/api/";
    public Authentication = this.API + "authentication";
    public Project = this.API + "jiraProject/"
    public GetAllProjects = this.Project + "projects";
}