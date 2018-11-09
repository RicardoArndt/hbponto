import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../app/store/services/user.service';
import { User, Role } from '../../app/models/user.model';
import { NgRedux, select } from '@angular-redux/store';
import { GetUsers } from '../../app/store/actions/user.action';
import { Failure } from '../../app/store/actions/base.action';

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  @select(s => s.users.get('Users')) users;

  roles: Role[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _userService: UserService,
              private _store: NgRedux<Map<string, User>>) {}

  ionViewDidLoad() {
    this.getAllUsers();
    this.getAllRoles();
  }

  getAllUsers() {
    this._userService.getAllUsers().subscribe((users: User[]) => {
      var action = new GetUsers(users);
      this._store.dispatch({type: action.type, payload: action.payload});
    }, err => {
      var action = new Failure(err);
      this._store.dispatch({type: action.type, payload: action.payload});
      throw err;
    });
  }

  getAllRoles() {
    this._userService.getAllRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
    }, err => {
      throw err
    });
  }

}
