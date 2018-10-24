import { Component } from '@angular/core';

/**
 * Generated class for the GridJiraComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'grid-jira',
  templateUrl: 'grid-jira.html'
})

export class GridJiraComponent {
  public dados = ["10/10/2018","08:00","06:00","11/10/2018","08:00","08:00"];
  public headers = [{icon: "arrow-down", title:"Data"},
  {icon: "arrow-down", title:"Hora Ponto"},
  {icon: "arrow-down", title:"Hora JIRA"}]
  text: string;

  constructor() {
    console.log('Hello GridJiraComponent Component');
    this.text = 'Hello World';
  }

}
