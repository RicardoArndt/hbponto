import { NgModule } from '@angular/core';
import { WorklogRegisterComponent } from './worklog-register/worklog-register';
import { IonicModule } from 'ionic-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { JiraProjectService } from '../app/store/services/jira-projects.service';
import { SearchOnListComponent } from './search-on-list/search-on-list';
import { Sprints } from './sprints/sprints';

@NgModule({
	declarations: [
		WorklogRegisterComponent,
    	SearchOnListComponent,
    	Sprints
	],
	imports: [
		IonicModule,
		ReactiveFormsModule
	],
	entryComponents: [
		WorklogRegisterComponent,
		Sprints
	],
	exports: [
		WorklogRegisterComponent,
    	SearchOnListComponent,
    	Sprints
	],
	providers: [
		JiraProjectService
	]
})
export class ComponentsModule {}
