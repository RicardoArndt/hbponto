import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { NgRedux, select } from "@angular-redux/store";
import { Map } from "immutable";
import { UsersPage } from '../pages/users/users';
import { RelatoriesPage } from '../pages/relatories/relatories';
import { CurrentUser } from './models/user.model';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthActions } from './store/actions/auth.action';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @select(s => s.auth.get('IsAuthenticated')) isAuthenticated;
  @select(s => s.auth.get('CurrentUser')) currentUserStore;

  user: CurrentUser;

  rootPage: any = TabsPage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private _menuCtrl: MenuController,
              private _store: NgRedux<Map<string, any>>,
              private _localStorage: LocalStorageService) {
    this.initializeApp();
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Usuários', component: UsersPage, icon: 'contacts' },
      { title: 'Relatórios', component: RelatoriesPage, icon: 'list-box' }
    ];
  }

  initializeApp() {
    var isAuthenticated;

    this.isAuthenticated.subscribe(x => {
      x ? this.rootPage = TabsPage : this.rootPage = LoginPage;;
    });

    this.currentUserStore.subscribe(x => {
      this.user = x ? x.toJS() : new CurrentUser();
    });

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    this._localStorage.clearAllCache();
    this._store.dispatch({type: AuthActions.LOGOUT});
    this._menuCtrl.close();
    this.rootPage = LoginPage;
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
