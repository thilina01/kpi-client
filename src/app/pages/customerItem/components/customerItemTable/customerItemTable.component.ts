import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message, DataTable } from 'primeng/primeng';
import { Router } from '@angular/router';
import { CustomerItemService } from '../../customerItem.service';
import { CustomerService } from '../../../customer/customer.service';
import { ItemService } from '../../../item/item.service';

@Component({
  selector: 'customer-item-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./customerItemTable.scss'],
  templateUrl: './customerItemTable.html'
})
export class CustomerItemTable {
  rows = [];
  [x: string]: any;
  filteredItems: any[];
  items: any;
  code: any;
  timeout: any;
  customerList: any;
  filteredCustomers: any[];
  customers: any;
  totalRecords: number;
  customer: any = { id: 0, code: 'ALL', name: '', display: 'All' };
  item: any = { id: 0, code: 'ALL', display: 'All Items' };
  @ViewChild(DataTable) dataTable: DataTable;

  constructor(
    protected service: CustomerItemService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private customerService: CustomerService,
    private itemService: ItemService,
    private sharedService: SharedService
  ) {
    this.getCustomers();
    this.getItems();
    this.loadData();
  }

  getCustomers(): void {
    this.customerService.getCombo().subscribe(customers => {
      this.customers = customers;
      this.customers.unshift({ id: 0, code: 'ALL', name: '', display: 'All' });
    });
  }

  getItems(): void {
    this.itemService.getCombo().subscribe(items => {
      this.items = items;
      this.items.unshift({ id: 0, code: 'ALL', display: 'All Items' });
    });
  }

  loadData() {
    this.service.getPage(0, 20).subscribe((data: any) => {
      this.fillTable(data);
    });
  }

  lazy(event: any, table: any) {
    this.search(event.first / event.rows, event.rows);
  }

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    if (this.customer !== undefined ? this.customer.id : 0) {
      this.service
        .getcustomerItem(
          this.customer !== undefined ? this.customer.id : 0,
          this.item !== undefined ? this.item.id : 0,
          this.code !== undefined ? this.code : 0,
          first,
          pageSize
        )
        .subscribe((data: any) => {
          this.fillTable(data);
        });
    } else if (this.item !== undefined ? this.item.id : 0) {
      this.service
        .getcustomerItem(
          this.customer !== undefined ? this.customer.id : 0,
          this.item !== undefined ? this.item.id : 0,
          this.code !== undefined ? this.code : 0,
          first,
          pageSize
        )
        .subscribe((data: any) => {
          this.fillTable(data);
        });
    } else if (this.code !== undefined ? this.code : 0) {
      this.service
        .getcustomerItem(
          this.customer !== undefined ? this.customer.id : 0,
          this.item !== undefined ? this.item.id : 0,
          this.code !== undefined ? this.code : 0,
          first,
          pageSize
        )
        .subscribe((data: any) => {
          this.fillTable(data);
        });
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
      console.log('paged!', event);
    }, 100);
  }

  onRowDblclick(data: any): void {
    window.open('/#/pages/customerItem/form/' + data.id, '_blank');
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/customerItem/form/' + id]);
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      accept: () => {
        this.service.delete(id).subscribe(response => {
          this.sharedService.addMessage({
            severity: 'info',
            summary: 'Deleted',
            detail: 'Delete success'
          });
          this.loadData();
        });
      }
    });
  }
  /*================== Customer Filter ===================*/
  filterCustomers(event) {
    let query = event.query.toLowerCase();
    this.filteredCustomers = [];
    for (let i = 0; i < this.customers.length; i++) {
      let customer = this.customers[i];
      if (customer.code.toLowerCase().indexOf(query) == 0) {
        this.filteredCustomers.push(customer);
      }
    }
  }

  onCustomerSelect(customer: any) {
    this.customer = customer;
    console.log(event);
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
    this.item = item;
    console.log(event);
  }

  /*================== End Of Item Filter ===================*/
}
