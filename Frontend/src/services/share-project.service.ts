import { JiraProjectService } from "../app/store/services/jira-projects.service";
import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { GetIssues, GetProjects, GetSprints, PostWorklog } from "../app/store/actions/jira-project.action";
import { Failure } from "../app/store/actions/base.action";
import { IssueFields, SprintsResponse, ProjectsResponse } from "../app/models/jira-projects.model";
import { Sprints } from "../components/sprints/sprints";
import { LocalStorageService } from "./local-storage.service";
import { ModalController } from "ionic-angular";

@Injectable()
export class ShareProjectService {
    constructor(public modalCtrl: ModalController,
                private _jiraProjectService: JiraProjectService,
                private _localStorage: LocalStorageService,
                private _store: NgRedux<Map<string, any>>) { }

      
    public updateWorklogSprint(boardId, userId, sprintId, issues, worklog) {
      this._jiraProjectService.updateIssues(userId, issues, worklog).subscribe(() => {
        this.updateIssues(boardId, sprintId);
      }, err => {
        var action = new Failure(err);
        this._store.dispatch({type: action.type, payload: action.payload});
        throw err;
      });
    }

    public updateIssues(boardId, sprintId) {
        this._jiraProjectService.getIssues(boardId, sprintId).subscribe((response: IssueFields[]) => {
          var action = new GetIssues(response);
          this._store.dispatch({type: action.type, payload: action.payload});
        }, err => {
          var action = new Failure(err);
          this._store.dispatch({type: action.type, payload: action.payload});
          throw err;
        });
    }

    public getProjectsFromService() {
      this._jiraProjectService.getAllProjects().subscribe((response: ProjectsResponse) => {
        this._localStorage.setItem('projects', JSON.stringify(response));
        var action = new GetProjects(response); 
        this._store.dispatch({type: action.type, payload: action.payload});
      }, err => {
        var action = new Failure(err); 
        this._store.dispatch({type: action.type, payload: action.payload});
        throw err;
      });
    }
  
    public dispatchProjects(items) {
      var action = new GetProjects(JSON.parse(items) as ProjectsResponse);
      this._store.dispatch({type: action.type, payload: action.payload});
    }
  
    public getSprintsFromService(boardId, sprints, sprintId?) {
      this._jiraProjectService.getSprints(boardId).subscribe((response: SprintsResponse) => {
        var action = new GetSprints(response);
        this._store.dispatch({type: action.type, payload: action.payload});
        this.modalCtrl.create(Sprints, {'sprints': sprints, 'boardId': boardId, 'sprintId': sprintId}).present();
      }, err => {
        var action = new Failure(err);
        this._store.dispatch({type: action.type, payload: action.payload});
        throw err;
      });
    }

    public postWorklog(issueId, userId, worklog) {
      this._jiraProjectService.postWorklog(issueId, userId, worklog).subscribe(response => {
        var action = new PostWorklog(worklog);
        this._store.dispatch({type: action.type, payload: action.payload});
      }, err => {
        var action = new Failure(err); 
        this._store.dispatch({type: action.type, payload: action.payload});
        throw err;
      });
    }
}