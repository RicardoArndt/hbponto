import { NgModule } from '@angular/core';
import { GridJiraComponent } from './grid-jira/grid-jira';
import { IonicModule } from 'ionic-angular';
import { InserirJiraComponent } from './inserir-jira/inserir-jira';
@NgModule({
	declarations: [GridJiraComponent,
    InserirJiraComponent],
	imports: [IonicModule],
	exports: [GridJiraComponent,
    InserirJiraComponent]
})
export class ComponentsModule {

}
