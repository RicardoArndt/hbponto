import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { select, NgRedux } from '@angular-redux/store';
import { CurrentUser } from '../../app/models/user.model';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  @select(s => s.auth.get('CurrentUser')) currentUserStore;
  user: CurrentUser;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _store: NgRedux<Map<string, any>>) {
    this.currentUserStore.subscribe(x => {
      this.user = x ? x.toJS() : new CurrentUser();
    });
  }

  ionViewDidLoad() {
    
  }

  get username() {
    var user = this.user.name.split(".");
    return user[0].toUpperCase().concat(" " + user[1].toUpperCase());
  }

}
