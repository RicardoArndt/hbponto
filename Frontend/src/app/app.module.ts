import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage, Sprints } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPageModule } from '../pages/login/login.module';
import { RootStoreModule } from "./store/modules/root-store.module";
import { ToastHandler } from './toast/toast-handler';
import { AppErrorHandler } from './errors/app-error-handler';
import { HttpRequestInterceptorModule } from '../interceptor/http-interceptor';
import { JiraProjectService } from './store/services/jira-projects.service';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Sprints
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    RootStoreModule,
    HttpRequestInterceptorModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Sprints
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: AppErrorHandler},
    ToastHandler,
    JiraProjectService
  ]
})
export class AppModule {}
