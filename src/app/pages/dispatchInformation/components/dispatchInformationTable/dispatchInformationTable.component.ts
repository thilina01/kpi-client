
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Observable } from 'rxjs/Rx';
import { DispatchInformationService } from '../../dispatchInformation.service';
import { CustomerService } from '../../../customer/customer.service';
import { ItemService } from '../../../item/item.service';

@Component({
  selector: 'dispatch-information-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dispatchInformationTable.scss'],
  templateUrl: './dispatchInformationTable.html',
})

export class DispatchInformationTable {
  filteredItems: any[];
  filteredCustomers: any[];
  rows = [];
  timeout: any;
  totalRecords: number;
  customers: any;
  items: any;
  startDate: Date;
  endDate: Date;
  @ViewChild(DataTable) dataTable: DataTable;
  customer: any = { id: 0, 'code': 'ALL', 'display': 'All Customers' }
  item: any = { id: 0, 'code': 'ALL', 'display': 'All Items' }

  constructor(protected service: DispatchInformationService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private customerService: CustomerService,
    private itemService: ItemService,
    private sharedService: SharedService) {
    this.loadData()
    this.getCustomers();
    this.getItems();
  }

  getCustomers(): void {
    this.customerService.getCombo().subscribe(customers => {
      this.customers = customers;
      this.customers.unshift({ id: 0, 'code': 'ALL', 'display': 'All Customers' });
    });
  }
  getItems(): void {
    this.itemService.getCombo().subscribe(items => {
      this.items = items;
      this.items.unshift({ id: 0, 'code': 'ALL', 'display': 'All Items' });
    });
  }

  loadData() {
    if (this.customer.id != undefined && this.customer.id != 0) {
      this.service.getPageByCustomer(this.customer, 0, 20).subscribe((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
      });
    }
    else if (this.item.id != undefined && this.item.id != 0) {
      this.service.getPageByItem(this.item, 0, 20).subscribe((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
      });
    } else {
      this.service.getPage(0, 20).subscribe((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
      });
    }
  }

  lazy(event: any, table: any) {
    const search = table.globalFilter ? table.globalFilter.value : null;

    if (this.customer.id != undefined && this.customer.id != 0) {
      this.service.getPageByCustomer(this.customer, (event.first / event.rows), event.rows).subscribe((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
      });
    }
    else if (this.item.id != undefined && this.item.id != 0) {
      this.service.getPageByItem(this.item, (event.first / event.rows), event.rows).subscribe((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
      });
    } else {
      this.service.getPage((event.first / event.rows), event.rows).subscribe((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
        this.search((event.first / event.rows), event.rows);

      });
    }
  }

  search(first: number, pageSize: number): void {
    if (this.startDate != undefined &&
      this.endDate != undefined &&
      this.customer != undefined &&
      this.customer.id != undefined &&
      this.item != undefined &&
      this.item.id != undefined) {
      if (this.customer.id == 0 && this.item.id == 0) {
        this.service.getByDispatchDurationPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
          this.fillTable(data);
        });
      } else if (this.customer.id == 0 && this.item.id > 0) {
        this.service.getByDispatchDurationAndItemPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.item.id, first, pageSize).subscribe((data: any) => {
          this.fillTable(data);
        });

      } else if (this.customer.id > 0 && this.item.id == 0) {
        this.service.getByCustomerAndDispatchDurationPage(this.customer.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
          this.fillTable(data);
        });
      }
      else {
        this.service.getByCustomerAndDispatchDurationAndItemPage(this.customer.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.item.id, first, pageSize).subscribe((data: any) => {
          this.fillTable(data);
        });
      }
    } else {
      this.service.getPage(first, pageSize).subscribe((data: any) => {
        this.fillTable(data);
      });
    }
  }

  fillTable(data: any) {
    this.rows = data.content;
    this.totalRecords = data.totalElements;
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.search(event.first, event.rows);
    }, 100);
  }

  /*================== Customer Filter ===================*/
  filterCustomers(event) {
    let query = event.query.toLowerCase();
    this.filteredCustomers = [];
    for (let i = 0; i < this.customers.length; i++) {
      let customer = this.customers[i];
      if (customer.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredCustomers.push(customer);
      }
    }
  }

  onCustomerSelect(customer: any) {
    console.log(event)
    this.customer = customer;
    this.loadData();
  }

  /*================== End Of Customer Filter ===================*/
  /*================== Item Filter ===================*/
  filterItems(event) {
    let query = event.query.toLowerCase();
    this.filteredItems = [];
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      if (item.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredItems.push(item);
      }
    }
  }

  onItemSelect(item: any) {
    console.log(event)
    this.item = item;
    this.loadData();
  }

  /*================== End Of Item Filter ===================*/
}






