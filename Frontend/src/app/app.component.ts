import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { NgRedux, select } from "@angular-redux/store";
import { Map } from "immutable";
import { UsersPage } from '../pages/users/users';
import { RelatoriesPage } from '../pages/relatories/relatories';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @select(s => s.auth.get('IsAuthenticated')) isAuthenticated;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private _loginStore: NgRedux<Map<string, any>>) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'ios-home' },
      { title: 'Usuários', component: UsersPage, icon: 'ios-contact' },
      { title: 'Relatórios', component: RelatoriesPage, icon: 'ios-folder-open' }
    ];

  }

  initializeApp() {
    this.isAuthenticated.subscribe(x => {
        this.rootPage = !x ? this.rootPage : LoginPage; 
    });

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
