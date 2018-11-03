import { Component, Input, Output, EventEmitter } from '@angular/core';
import { fromJS } from 'immutable';

@Component({
  selector: 'search-on-list',
  templateUrl: 'search-on-list.html'
})
export class SearchOnListComponent {

  @Input() listForFilter;
  @Input() parameter: string;
  @Output() listOutput: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  getItems(ev: any) {
    const val = ev.target.value;

    if (val && val.trim() != '') {
      var obj: any[] = [];

      this.listForFilter.filter(item => {
            obj.push(item.toObject());
      });

      obj = obj.filter((item) => {
        return (item[this.parameter].toUpperCase().indexOf(val.toUpperCase()) > -1);
      })

      this.listOutput.emit(fromJS(obj));

      return true;
    };

    this.listOutput.emit(this.listForFilter);

    return false;
  }
}
