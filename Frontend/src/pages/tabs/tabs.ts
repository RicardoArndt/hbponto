import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { UsersPage } from '../users/users';
import { RelatoriesPage } from '../relatories/relatories';
import { UserPage } from '../user/user';
import { CurrentUser } from '../../app/models/user.model';
import { NgRedux, select } from '@angular-redux/store';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = UserPage;
  
  constructor() { }
}
