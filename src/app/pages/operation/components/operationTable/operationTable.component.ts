import { OperationService } from '../../../../services/operation.service';
import { Component, ViewEncapsulation } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'operation-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./operationTable.scss'],
  templateUrl: './operationTable.html',
})
export class OperationTable {
  rows = [];
  timeout: any;
  columns = [
    { prop: 'id', name: 'ID' },
    { prop: 'code', name: 'Code' },
    { prop: 'description', name: 'Description' },
    { prop: 'operationType.type', name: 'Type' }
  ];

  constructor(protected service: OperationService) {
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
