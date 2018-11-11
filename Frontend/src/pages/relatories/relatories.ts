import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RelatoryService } from '../../app/store/services/relatory.service';
import { Relatory } from '../../app/models/relatory.model';
import { GetRelatories } from '../../app/store/actions/relatory.action';
import { NgRedux, select } from '@angular-redux/store';
import { Failure } from '../../app/store/actions/base.action';

@IonicPage()
@Component({
  selector: 'page-relatories',
  templateUrl: 'relatories.html',
})
export class RelatoriesPage {
  @select(r => r.relatories.get('Relatories')) relatories;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _relatoryService: RelatoryService,
              private _store: NgRedux<Map<string, any>>) {
  }

  ionViewDidLoad() {
    this.relatories.subscribe(x => !x ? this.getAllRelatories() : null);
  }

  getAllRelatories() {
    this._relatoryService.getAllRelatories().subscribe((relatory: Relatory[]) => {
      var action = new GetRelatories(relatory);
      this._store.dispatch({type: action.type, payload: action.payload});
    }, err => {
      var action = new Failure(err);
      this._store.dispatch({type: action.type, payload: action.payload});
      throw err;
    });
  }

}
