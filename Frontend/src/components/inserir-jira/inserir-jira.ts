import { Component } from '@angular/core';

/**
 * Generated class for the InserirJiraComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'inserir-jira',
  templateUrl: 'inserir-jira.html'
})
export class InserirJiraComponent {

  text: string;

  constructor() {
    console.log('Hello InserirJiraComponent Component');
    this.text = 'Hello World';
  }

}
