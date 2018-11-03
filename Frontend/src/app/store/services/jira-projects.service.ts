import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseRoute } from "./routes/base";
import { WorklogRegister } from "../../models/jira-projects.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export class JiraProjectService {
    private _routeApi: BaseRoute = new BaseRoute();

    constructor(private _http: HttpClient) { }

    getAllProjects(): Observable<any> {
        return this._http.get(this._routeApi.GetAllProjects);
    }

    getSprints(id: number): Observable<any> {
        return this._http.get(this._routeApi.GetSprints + id);
    }

    getIssues(boardId: number, sprintId: number): Observable<any> {
        return this._http.get(this._routeApi.Project + boardId + '/sprint/' + sprintId + '/issue');
    }

    postWorklog(issueId: number, worklog: WorklogRegister): Observable<any> {
        return this._http.post(this._routeApi.Issue + issueId, worklog);
    }
}