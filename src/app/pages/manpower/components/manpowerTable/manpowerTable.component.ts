import { ManpowerService } from '../../../../services/manpower.service';
import { Component, ViewEncapsulation } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'manpower-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./manpowerTable.scss'],
  templateUrl: './manpowerTable.html',
})
export class ManpowerTable {
  rows = [];
  timeout: any;
  columns = [
    { prop: 'id', name: 'ID' },
    { prop: 'code', name: 'Code' },
    { prop: 'description', name: 'Description' },
    { prop: 'manpowerType.type', name: 'Type' }
  ];

  constructor(protected service: ManpowerService) {
    this.service.getAll().then((data) => {
      this.rows = data;
    });
  }


  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }
}
