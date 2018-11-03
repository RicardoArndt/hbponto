import { NavParams, ViewController } from "ionic-angular";
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { WorklogRegister } from "../../app/models/jira-projects.model";
import { JiraProjectService } from "../../app/store/services/jira-projects.service";
import { NgRedux, select } from '@angular-redux/store';
import { PostWorklog } from "../../app/store/actions/jira-project.action";
import { Failure } from "../../app/store/actions/base.action";

@Component({
  selector: 'worklog-register',
  templateUrl: 'worklog-register.html'
})
export class WorklogRegisterComponent {

  issueId: number;
  issueKey: string;
  formWorklog: FormGroup;
  worklog: WorklogRegister = new WorklogRegister();

  constructor(private _params: NavParams,
              private _viewCtrl: ViewController,
              private _fb: FormBuilder,
              private _jiraService: JiraProjectService,
              private _store: NgRedux<Map<string, any>>) {
    this.issueId = _params.get('issueId');
    this.issueKey = _params.get('issueKey');
    this.formBuilder();
  }

  onClose() {
    this._viewCtrl.dismiss();
  }

  onSubmit() {
    console.log("ENTROU");
    this.worklog.comment = this.comment.value;
    this.worklog.timeSpent = this.timeSpent.value;
    this.worklog.started = this.started.value;

    this._jiraService.postWorklog(this.issueId, this.worklog).subscribe(response => {
      var action = new PostWorklog(this.worklog);
      this._store.dispatch({type: action.type, payload: action.payload});
      this._viewCtrl.dismiss();
    }, err => {
      var action = new Failure(err); 
      this._store.dispatch({type: action.type, payload: action.payload});
      throw err;
    });
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
