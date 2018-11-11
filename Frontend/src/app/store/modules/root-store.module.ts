import { NgModule, isDevMode } from "@angular/core";
import { NgRedux, NgReduxModule, DevToolsExtension } from "@angular-redux/store";
import { ROOT_STATE } from "../states/root.state";
import { authReducer } from "../reducers/auth.reducer";
import { HttpClientModule } from "@angular/common/http";
import { fromJS, Map } from "immutable";
import { combineReducers } from "redux";
import { jiraProjectReducer } from "../reducers/jira-project.reducer";
import { usersReducer } from "../reducers/user.reducer";
import { relatoryReducer } from "../reducers/relatory.reducer";

@NgModule({
    imports: [
        NgReduxModule, 
        HttpClientModule
    ],
    providers: []
})
export class RootStoreModule {
    constructor(private _store: NgRedux<Map<string, any>>, 
                private _devTools: DevToolsExtension) {
        var enhancers = [];

        if(this._devTools.enhancer()) enhancers = isDevMode() ? [this._devTools.enhancer()] : [];
        
        this._store.configureStore(rootReducer, fromJS(ROOT_STATE), [], enhancers);
    }
 }

 const rootReducer = combineReducers<Map<string, any>>({
    auth: authReducer,
    jiraProjects: jiraProjectReducer,
    users: usersReducer,
    relatories: relatoryReducer
 })