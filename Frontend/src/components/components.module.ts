import { NgModule } from '@angular/core';
import { WorklogRegisterComponent } from './worklog-register/worklog-register';
import { IonicModule } from 'ionic-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { JiraProjectService } from '../app/store/services/jira-projects.service';
import { SearchOnListComponent } from './search-on-list/search-on-list';

@NgModule({
	declarations: [
		WorklogRegisterComponent,
    	SearchOnListComponent
	],
	imports: [
		IonicModule,
		ReactiveFormsModule
	],
	entryComponents: [
		WorklogRegisterComponent
	],
	exports: [
		WorklogRegisterComponent,
    	SearchOnListComponent
	],
	providers: [
		JiraProjectService
	]
})
export class ComponentsModule {}
