import { ItemService } from '../../../../services/item.service';
import { Component, ViewEncapsulation } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'item-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./itemTable.scss'],
  templateUrl: './itemTable.html',
})

export class ItemTable {
  rows = [];
  timeout: any;
  columns = [
    { prop: 'id', name: 'ID' },
    { prop: 'code', name: 'Code' },
    { prop: 'description', name: 'Description' },
    { prop: 'itemType.type', name: 'Type' }
  ];

  constructor(protected service: ItemService) {
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
