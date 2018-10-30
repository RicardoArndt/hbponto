import { Component, OnChanges } from '@angular/core';
import { NavController, ModalController, NavParams, ViewController } from 'ionic-angular';
import { JiraProjectService } from '../../app/store/services/jira-projects.service';
import { GetProjects, GetSprints, GetIssues } from '../../app/store/actions/jira-project.action';
import { NgRedux, select } from '@angular-redux/store';
import { Failure } from '../../app/store/actions/base.action';
import { ProjectsResponse, SprintsResponse, IssuesReponse, Issues } from '../../app/models/jira-projects.model';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @select(s => s.jiraProjects.get('Projects')) projects;
  @select(s => s.jiraProjects.get('Sprints')) sprints;
  @select(s => s.jiraProjects.get('Issues')) issues;

  constructor(public navCtrl: NavController,
              private _jiraProjectService: JiraProjectService,
              private _store: NgRedux<Map<string, any>>,
              public modalCtrl: ModalController,
              private _localStorage: LocalStorageService) { }

  ionViewDidLoad() {
    this.getAllProjects();
  }

  getAllProjects() {
    let items = this._localStorage.getItem('projects');
    if(items) {
      let projects: ProjectsResponse = JSON.parse(items);
      var action = new GetProjects(projects);
      this._store.dispatch({type: action.type, payload: action.payload});
    } else {
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
  }
  
  onChange(boardId: number) {
    this._jiraProjectService.getSprints(boardId).subscribe((response: SprintsResponse) => {
      var action = new GetSprints(response);
      this._store.dispatch({type: action.type, payload: action.payload});
      let sprintModal = this.modalCtrl.create(Sprints, {'sprints': this.sprints, 'boardId': boardId});
      sprintModal.present();  
    }, err => {
      var action = new Failure(err);
      this._store.dispatch({type: action.type, payload: action.payload});
      throw err;
    });
  }

  getEstimatedTime(issue) {
    var result = issue.get('fields')
                      .get('timetracking')
                      .get('originalEstimate');
    return result ? result : 'NA';
  }

  getTimeSpent(issue) {
    return issue;
  }
}

@Component({
  selector: 'sprints',
  templateUrl: 'sprints.html',
})
export class Sprints {
  sprints;
  boardId;

  constructor(private _params: NavParams, 
              public viewCtrl: ViewController,
              private _jiraProjectService: JiraProjectService,
              private _store: NgRedux<Map<string, any>>) {
    this.sprints = this._params.get('sprints');
    this.boardId = this._params.get('boardId');
  }
  
  onChange(sprintId: number) {
    this._jiraProjectService.getIssues(this.boardId, sprintId).subscribe((response: IssuesReponse) => {
      var action = new GetIssues(response);
      this._store.dispatch({type: action.type, payload: action.payload});
      this.viewCtrl.dismiss();
    }, err => {
      var action = new Failure(err);
      this._store.dispatch({type: action.type, payload: action.payload});
      throw err;
    });
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

  count(list): boolean {
    if(list.size > 0) return false;
    return true;
  }
}
