import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../app/store/services/user.service';
import { User, Role } from '../../app/models/user.model';
import { NgRedux, select } from '@angular-redux/store';
import { GetUsers } from '../../app/store/actions/user.action';
import { Failure } from '../../app/store/actions/base.action';
import { ListHelper } from '../../app/helpers/list.helper';

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
    this.users.subscribe(x => !x ? this.getAllUsers() : null);
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

  onChange(user: any, newRole: any) {
    user = user.toObject() as User;
    var userUpdate = new User(user.id, user.userName, newRole.value);
    var newList: User[] = ListHelper.update(this.users, newRole.value, 'role', user.id).toJS();

    this._userService.updateUser(userUpdate).subscribe(() => {
      var action = new GetUsers(newList);
      this._store.dispatch({type: action.type, payload: action.payload});
    }, err => {
      var action = new Failure(err);
      this._store.dispatch({type: action.type, payload: action.payload});
      throw err;
    });
  }
}
