import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public dados = ["10/10/2018","08:00","06:00"];
  public headers = [{icon: "arrow-down", title:"Data"},
  {icon: "arrow-down", title:"Hora Ponto"},
  {icon: "arrow-down", title:"Hora JIRA"}] 
  constructor(public navCtrl: NavController) {

  }

  
}
