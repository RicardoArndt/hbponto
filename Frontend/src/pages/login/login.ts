import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../app/store/services/auth.service';
import { AuthUser, AuthUserResponse } from '../../app/models/auth-user.model';
import { select } from '@angular-redux/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormErrors } from "../forms/errors";
import { NgRedux } from "@angular-redux/store";
import { Map } from "immutable";
import { LogInSuccess, LogInFailure } from '../../app/store/actions/auth.action';
import { LocalStorageService } from '../../services/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HomePage } from '../home/home';

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
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private _authService: AuthService,
              private _fb: FormBuilder,
              private _store: NgRedux<Map<string, any>>,
              private _localStorage: LocalStorageService) {
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

    this._authService.login(this.user).subscribe((response: AuthUserResponse) => {
        var state = new LogInSuccess(response);
        this._store.dispatch({type: state.type, payload: state.payload});
        console.log(response);
        this._localStorage.setAuthenticationTokens(response.token, response.authJiraToken);
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
}