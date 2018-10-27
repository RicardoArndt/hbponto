import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JiraProjectService } from '../../app/store/services/jira-projects.service';
import { NgRedux } from '@angular-redux/store';
import { GetProjects } from '../../app/store/actions/jira-project.action';
import { Failure } from '../../app/store/actions/base.action';

/**
 * Generated class for the ConfigurationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private _jiraProjectService: JiraProjectService,
              private _store: NgRedux<Map<string, any>>) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigurationPage');
  }

  getAllProjects() {
    this._jiraProjectService.getAllProjects().subscribe(response => {
      var action = new GetProjects(response); 
      this._store.dispatch({type: action.type, payload: action.payload});
    }, err => {
      var action = new Failure(err); 
      this._store.dispatch({type: action.type, payload: action.payload});
      throw err;
    });
  }
}
