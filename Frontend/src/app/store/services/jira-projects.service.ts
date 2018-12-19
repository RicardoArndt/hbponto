import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseRoute } from "./routes/base";
import { WorklogRegister, IssuesForPostWorklog } from "../../models/jira-projects.model";
import { Observable } from "rxjs/Observable";
import { BaseService } from "./base.service";

@Injectable()
export class JiraProjectService extends BaseService<any> {
    constructor(protected _http: HttpClient) {
        super(_http);
     }

    getAllProjects(): Observable<any> {
        return this.doGet(BaseRoute.GetAllProjects);
    }

    getSprints(id: number): Observable<any> {
        return this.doGet(BaseRoute.GetSprints + id);
    }

    getIssues(boardId: number, sprintId: number): Observable<any> {
        return this.doGet(BaseRoute.Project + boardId + '/sprint/' + sprintId + '/issue');
    }

    updateIssues(userId: number, issues: IssuesForPostWorklog, worklog: WorklogRegister): Observable<any> {
        return this.doPut(BaseRoute.UpdateIssues + '/' + userId, {'Issues': issues, 'Worklog': worklog});
    }

    postWorklog(issueId: number, userId: string, worklog: WorklogRegister): Observable<any> {
        return this.doPost(BaseRoute.Issue + issueId + '/' + userId, worklog);
    }
}