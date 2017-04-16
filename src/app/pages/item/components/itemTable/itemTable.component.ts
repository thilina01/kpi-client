import { ItemService } from '../../../../services/item.service';
import { Component, ViewEncapsulation } from '@angular/core';

//import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'item-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./itemTable.scss'],
  templateUrl: './itemTable.html',
})
export class ItemTable {
  rows = [];
  timeout: any;
  totalRecords: number;
  /*
  columns = [
    { prop: 'id', name: 'ID' },
    { prop: 'code', name: 'Code' },
    { prop: 'description', name: 'Description' },
    { prop: 'itemType.type', name: 'Type' }
  ];
*/

  constructor(protected service: ItemService) {
    this.service.getPage(0, 15).then((data: any) => {
      this.rows = data.content;
      this.totalRecords = data.totalElements;
    });
  }


  lazy(event: any, table: any) {
    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network
    /*setTimeout(() => {
        if(this.datasource) {
            this.cars = this.datasource.slice(event.first, (event.first + event.rows));
        }
    }, 250);*/
    //console.log(event);
    //console.log(table.globalFilter.value);
    const search = table.globalFilter ? table.globalFilter.value : null;
    this.service.getPage((event.first / event.rows), event.rows).then((data: any) => {
      this.rows = data.content;
      this.totalRecords = data.totalElements;
    });
    /*
    this.service.getAll().then((data) => {
      this.rows = data;
    });*/
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }
}
