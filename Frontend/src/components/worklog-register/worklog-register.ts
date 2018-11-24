import { NavParams, ViewController } from "ionic-angular";
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { WorklogRegister, IssuesForPostWorklog } from "../../app/models/jira-projects.model";
import { LocalStorageService } from "../../services/local-storage.service";
import { ShareProjectService } from "../../services/share-project.service";

@Component({
  selector: 'worklog-register',
  templateUrl: 'worklog-register.html'
})
export class WorklogRegisterComponent {

  issueId: number;
  issues: IssuesForPostWorklog[];
  boardId: number;
  sprintId: number;
  issueKey: string;
  formWorklog: FormGroup;
  worklog: WorklogRegister = new WorklogRegister();

  constructor(private _params: NavParams,
              private _viewCtrl: ViewController,
              private _fb: FormBuilder,
              private _shareProjectService: ShareProjectService,
              private _localStorage: LocalStorageService) {
    this.issueId = this._params.get('issueId');
    this.issueKey = this._params.get('issueKey');
    this.boardId = this._params.get('boardId');
    this.sprintId = this._params.get('sprintId');
    this.issues = this._params.get('issues');
    this.formBuilder();
  }

  onClose() {
    this._viewCtrl.dismiss();
  }

  onSubmit() {
    this.worklog.comment = this.comment.value;
    this.worklog.timeSpent = this.timeSpent.value;
    this.worklog.started = this.started.value;
    this.worklog.key = this.issueKey ? this.issueKey : null;

    var userId = this._localStorage.UserId;

    this.issueKey ? this._shareProjectService.postWorklog(this.issueId, userId, this.worklog) : this._shareProjectService.updateWorklogSprint(this.boardId, userId, this.sprintId, this.issues, this.worklog);
    this._viewCtrl.dismiss();
  }

  get comment() {
    return this.formWorklog.get('comment');
  }

  get timeSpent() {
    return this.formWorklog.get('timeSpent');
  }

  get started() {
    return this.formWorklog.get('started');
  }

  private formBuilder() {
    this.formWorklog = this._fb.group({
      started: ['', Validators.required],
      timeSpent: ['', Validators.required],
      comment: ['', Validators.required]
    })
  }
}
