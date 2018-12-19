import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { select, NgRedux } from '@angular-redux/store';
import { CurrentUser } from '../../app/models/user.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { AuthActions } from '../../app/store/actions/auth.action';
import { LoginPage } from '../login/login';

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
              private _store: NgRedux<Map<string, any>>,
              private _localStorage: LocalStorageService) {
    this.currentUserStore.subscribe(x => {
      this.user = x ? x.toJS() : new CurrentUser();
    });
  }

  ionViewDidLoad() {
    
  }

  logout() {
    this._localStorage.clearAllCache();
    this._store.dispatch({type: AuthActions.LOGOUT});
    this.navCtrl.push(LoginPage);
  }

  get username() {
    var user = this.user.name.split(".");
    return user[0].toUpperCase().concat(" " + user[1].toUpperCase());
  }

}
