import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { select } from '@angular-redux/store';
import { ShareIssue, IssuesForPostWorklog } from '../../app/models/jira-projects.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { WorklogRegisterComponent } from '../../components/worklog-register/worklog-register';
import { ToastHandler } from '../../app/toast/toast-handler';
import { ShareProjectService } from '../../services/share-project.service';

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
  issuesShare: ShareIssue[] = [];
  issuesForPost: IssuesForPostWorklog[] = [];
  selected: boolean = true;

  constructor(public navCtrl: NavController,
              private _shareProjectService: ShareProjectService,
              public modalCtrl: ModalController,
              private _localStorage: LocalStorageService,
              private _toastHandler: ToastHandler) { }

  ionViewDidLoad() {
    this.getAllProjects();
    this.initProjectConfigurations();
  }

  initProjectConfigurations() {
    this.boardSelected = parseInt(this._localStorage.getItem('boardSelected'));
    this.sprintSelected = parseInt(this._localStorage.getItem('sprintSelected'));

    this.issues.subscribe(x => {
      this.issuesFilter = x;
      this.issuesForPost.length > 0 ? this.issuesForPost = [] : null;
      x ? x.forEach(y => this.issuesForPost.indexOf(y.get('key'))  === -1 ? this.issuesForPost.push({id: y.get('key'), originalEstimateSeconds: y.get('timetracking').get('originalEstimateSeconds')}) : null) : null;
      !x ? this.onChange(this.boardSelected, this.sprintSelected) : null;
    });
  }

  getAllProjects() {
    let items = this._localStorage.getItem('projects');
    items ? this._shareProjectService.dispatchProjects(items) : this._shareProjectService.getProjectsFromService();
  }
  
  onChange(boardId: number, sprintId?: number) {
    this._localStorage.clearCacheAndReCacheBoard(boardId.toString());
    this._shareProjectService.getSprintsFromService(boardId, this.sprints, sprintId);
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
    this._shareProjectService.updateIssues(parseInt(this._localStorage.getItem('boardSelected')), parseInt(this._localStorage.getItem('sprintSelected')));
  }

  onShareWorklog() {
    console.log(this.issuesForPost);
    this.issuesForPost ? this.modalCtrl.create(WorklogRegisterComponent, {'boardId': this.boardSelected, 'sprintId': this.sprintSelected, 'issues': this.issuesForPost}).present() : this._toastHandler.handlerToast("Selecione ao menos um issue").present();
  }

  onChangeShare(id: string, originalEstimateSeconds: number, selected: boolean) {
    selected ? this.issuesForPost.push({id: id, originalEstimateSeconds: originalEstimateSeconds}) : this.issuesForPost.splice(this.issuesForPost.indexOf({id: id, originalEstimateSeconds: originalEstimateSeconds}), 1);
  }
}
