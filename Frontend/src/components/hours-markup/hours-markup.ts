import { Component } from '@angular/core';

/**
 * Generated class for the HoursMarkupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'hours-markup',
  templateUrl: 'hours-markup.html'
})
export class HoursMarkupComponent {

  text: string;

  constructor() {
    console.log('Hello HoursMarkupComponent Component');
    this.text = 'Hello World';
  }

}
