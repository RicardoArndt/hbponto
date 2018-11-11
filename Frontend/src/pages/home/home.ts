import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { JiraProjectService } from '../../app/store/services/jira-projects.service';
import { GetProjects, GetSprints, GetIssues } from '../../app/store/actions/jira-project.action';
import { NgRedux, select } from '@angular-redux/store';
import { Failure } from '../../app/store/actions/base.action';
import { ProjectsResponse, SprintsResponse, IssueFields } from '../../app/models/jira-projects.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { WorklogRegisterComponent } from '../../components/worklog-register/worklog-register';
import { Sprints } from '../../components/sprints/sprints';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @select(s => s.jiraProjects.get('Projects')) projects;
  @select(s => s.jiraProjects.get('Sprints')) sprints;
  @select(s => s.jiraProjects.get('Issues')) issues;
  issuesFilter;
  boardSelected: number;
  sprintSelected: number;

  constructor(public navCtrl: NavController,
              private _jiraProjectService: JiraProjectService,
              private _store: NgRedux<Map<string, any>>,
              public modalCtrl: ModalController,
              private _localStorage: LocalStorageService) { }

  ionViewDidLoad() {
    this.getAllProjects();
    this.initProjectConfigurations();
  }

  initProjectConfigurations() {
    this.boardSelected = parseInt(this._localStorage.getItem('boardSelected'));
    this.sprintSelected = parseInt(this._localStorage.getItem('sprintSelected'));

    this.issues.subscribe(x => {
      this.issuesFilter = x;
      !x ? this.onChange(this.boardSelected, this.sprintSelected) : null;
    });
  }

  getAllProjects() {
    let items = this._localStorage.getItem('projects');
    items ? this.dispatchProjects(items) : this.getProjectsFromService();
  }
  
  onChange(boardId: number, sprintId?: number) {
    this._localStorage.clearCacheAndReCacheBoard(boardId.toString());
    this.getSprintsFromService(boardId, sprintId);
  }

  getInitialsName(name: string) {
    return name.substring(0, 2).toUpperCase();
  }

  getEstimatedTime(issue) {
    var result = issue.get('timetracking')
                      .get('originalEstimate');
    return result ? result : 'NE';
  }

  getTotalTime(issue) {
    var time = issue.get('timetracking').get('timeSpent');
    return time ? time : '0H';
  }

  getColor(timeEstimated: string, totalTime: string): string {
    var time = parseFloat(timeEstimated);
    var total = parseFloat(totalTime);

    if(time == total) {
      return "dark";
    } else if(time > total) {
      return "secondary"
    } else if(time < total) {
      return "danger";
    } else {
      return "dark";
    }
  }

  openModalWorklog(issueId: number, issueKey: string) {
    this.modalCtrl.create(WorklogRegisterComponent, {'issueId': issueId, 'issueKey': issueKey}).present();
  }

  onFilter(value: any) {
    this.issuesFilter = value;
  }

  onUpdateSprint() {
    this.updateIssues(this.boardSelected, this.sprintSelected);
  }

  private getProjectsFromService() {
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

  private dispatchProjects(items) {
    var action = new GetProjects(JSON.parse(items) as ProjectsResponse);
    this._store.dispatch({type: action.type, payload: action.payload});
  }

  private getSprintsFromService(boardId, sprintId?) {
    this._jiraProjectService.getSprints(boardId).subscribe((response: SprintsResponse) => {
      var action = new GetSprints(response);
      this._store.dispatch({type: action.type, payload: action.payload});
      this.modalCtrl.create(Sprints, {'sprints': this.sprints, 'boardId': boardId, 'sprintId': sprintId}).present();
    }, err => {
      var action = new Failure(err);
      this._store.dispatch({type: action.type, payload: action.payload});
      throw err;
    });
  }

  private updateIssues(boardId, sprintId) {
    this._jiraProjectService.getIssues(boardId, sprintId).subscribe((response: IssueFields[]) => {
      var action = new GetIssues(response);
      this._store.dispatch({type: action.type, payload: action.payload});
    }, err => {
      var action = new Failure(err);
      this._store.dispatch({type: action.type, payload: action.payload});
      throw err;
    });
  }
}
