import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { AuthService } from '../../app/store/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NgReduxModule } from '@angular-redux/store';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SQLite } from '@ionic-native/sqlite';
import { LocalStorageService } from '../../services/local-storage.service';

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    HttpClientModule,
    NgReduxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    LoginPage
  ],
  providers: [
    AuthService,
    SQLite,
    LocalStorageService
  ]
})
export class LoginPageModule {}
