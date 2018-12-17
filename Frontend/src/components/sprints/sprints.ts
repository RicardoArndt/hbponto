import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { JiraProjectService } from '../../app/store/services/jira-projects.service';
import { NgRedux } from '@angular-redux/store';
import { LocalStorageService } from '../../services/local-storage.service';
import { GetIssues } from '../../app/store/actions/jira-project.action';
import { Failure } from '../../app/store/actions/base.action';
import { IssueFields } from '../../app/models/jira-projects.model';

@Component({
  selector: 'sprints',
  templateUrl: 'sprints.html',
})
export class Sprints {
  sprints;
  boardId;
  sprintId;
  sprintsJS: any[];
  sprintName: string;

  constructor(private _params: NavParams, 
              public viewCtrl: ViewController,
              private _jiraProjectService: JiraProjectService,
              private _store: NgRedux<Map<string, any>>,
              private _localStorage: LocalStorageService) {
    this.sprints = this._params.get('sprints');
    this.boardId = this._params.get('boardId');
    this.sprintId = this._params.get('sprintId');
    this.sprintId ? this.onChange(this.sprintId) : null;
  }
  
  onChange(sprintId: number) {
    this.sprintName = this.getSprintName(sprintId);
    this._localStorage.clearCacheAndReCacheSprint(sprintId.toString(), this.sprintName);
    
    this._jiraProjectService.getIssues(this.boardId, sprintId).subscribe((response: IssueFields[]) => {
      var action = new GetIssues(response);
      this._store.dispatch({type: action.type, payload: action.payload});
      this.viewCtrl.dismiss(this.sprintName);
    }, err => {
      var action = new Failure(err);
      this._store.dispatch({type: action.type, payload: action.payload});
      throw err;
    });
  }

  onClose() {
    this.viewCtrl.dismiss(this.sprintName ? this.sprintName : this._localStorage.getItem('sprintName'));
  }

  count(list): boolean {
    if(list.size > 0) return false;
    return true;
  }

  private getSprintName(sprintId): string {
    this.sprints.subscribe(x => {
      this.sprintsJS = x ? x.toJS() : null;
    });

    var result = this.sprintsJS.find(x => x.id == sprintId).name;

    return result ? result : this._localStorage.getItem('sprintName');
  }
}