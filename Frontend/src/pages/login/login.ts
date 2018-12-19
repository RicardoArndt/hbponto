import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../app/store/services/auth.service';
import { AuthUser, AuthUserResponse } from '../../app/models/auth-user.model';
import { select } from '@angular-redux/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormErrors } from "../forms/errors";
import { NgRedux } from "@angular-redux/store";
import { Map } from "immutable";
import { LogInSuccess, LogInFailure, CurrentUserAction } from '../../app/store/actions/auth.action';
import { LocalStorageService } from '../../services/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HomePage } from '../home/home';
import { CurrentUser } from '../../app/models/user.model';
import { ToastHandler } from '../../app/toast/toast-handler';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: AuthUser = new AuthUser();
  formUser: FormGroup;
  error: FormErrors = new FormErrors();

  @select(s => s.auth.get('IsAuthenticated')) isAuthenticated;
  @select(s => s.auth.get('UserName')) _username;
  @select(s => s.auth.get('CurrentUser')) currentUserStore;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private _authService: AuthService,
              private _fb: FormBuilder,
              private _store: NgRedux<Map<string, any>>,
              private _localStorage: LocalStorageService,
              private _toastHandler: ToastHandler) {
    this.formBuilder();
  }

  ionViewDidLoad() {
    if(this._localStorage.TokenJiraAuthentication) this.validateAuthorization();
  }

  validateAuthorization() {
    this._authService.validateAuthorization().subscribe((response: AuthUserResponse) => {
      var p: AuthUserResponse = {
        token: this._localStorage.TokenAuthentication,
        authJiraToken: this._localStorage.TokenJiraAuthentication
      }
      var state = new LogInSuccess(response);
      this._store.dispatch({type: state.type, payload: p});
      this.currentUser();
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      var state = new LogInFailure({Error: err.message});
      this._store.dispatch({type: state.type, payload: state.payload});
      throw err;
    });
  }

  onSubmit() {
    this.user.UserName = this.username.value;
    this.user.Password = this.password.value;

    this._authService.login(this.user).subscribe(response => {
        var cast = response as AuthUserResponse;
        var actionLogin = new LogInSuccess(cast);
        this._store.dispatch({type: actionLogin.type, payload: actionLogin.payload});
        this._localStorage.setAuthenticationTokens(cast.token, cast.authJiraToken, cast.userId);
        this.currentUser();
        this.navCtrl.setRoot(HomePage);
    }, (err: HttpErrorResponse) => {
        var state = new LogInFailure({Error: err.message});
        this._store.dispatch({type: state.type, payload: state.payload});
        throw err;
    });
  }

  get ifErrors() {
    if(this.username.errors || this.password.errors) return true;
    return false;
  }

  get username() {
    return this.formUser.get('username');
  }

  get password() {
    return this.formUser.get('password');
  }

  private formBuilder() {
    this.formUser = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  private currentUser() {
    this.currentUserStore.subscribe(x => !x ?
        this._authService.getCurrentUser().subscribe((response: CurrentUser) => {
          var actionCurrentUser = new CurrentUserAction(response);
          this._store.dispatch({type: actionCurrentUser.type, payload: actionCurrentUser.payload});
        }) : null
    )
  }
}
