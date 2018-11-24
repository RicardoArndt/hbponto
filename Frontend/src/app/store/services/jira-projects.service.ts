import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseRoute } from "./routes/base";
import { WorklogRegister, IssuesForPostWorklog } from "../../models/jira-projects.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export class JiraProjectService {
    constructor(private _http: HttpClient) { }

    getAllProjects(): Observable<any> {
        return this._http.get(BaseRoute.GetAllProjects);
    }

    getSprints(id: number): Observable<any> {
        return this._http.get(BaseRoute.GetSprints + id);
    }

    getIssues(boardId: number, sprintId: number): Observable<any> {
        return this._http.get(BaseRoute.Project + boardId + '/sprint/' + sprintId + '/issue');
    }

    updateIssues(userId: number, issues: IssuesForPostWorklog, worklog: WorklogRegister): Observable<any> {
        return this._http.put(BaseRoute.UpdateIssues + '/' + userId, {'Issues': issues, 'Worklog': worklog});
    }

    postWorklog(issueId: number, userId: string, worklog: WorklogRegister): Observable<any> {
        return this._http.post(BaseRoute.Issue + issueId + '/' + userId, worklog);
    }
}