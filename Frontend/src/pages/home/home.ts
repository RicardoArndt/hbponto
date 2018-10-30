import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public dados = ["10/10/2018","08:00","06:00"];
  public headers = [{icon: "md-arrow-dropdown", title:"Data"},
  {icon: "md-arrow-dropdown", title:"Hora Ponto"},
  {icon: "md-arrow-dropdown", title:"Hora JIRA"}] 
  constructor(public navCtrl: NavController) {

  }

  
}
