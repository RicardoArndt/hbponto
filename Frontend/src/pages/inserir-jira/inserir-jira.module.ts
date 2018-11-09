import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InserirJiraPage } from './inserir-jira';

@NgModule({
  declarations: [
    InserirJiraPage,
  ],
  imports: [
    IonicPageModule.forChild(InserirJiraPage),
  ],
})
export class InserirJiraPageModule {}
