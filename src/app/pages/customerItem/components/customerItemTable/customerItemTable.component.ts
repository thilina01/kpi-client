
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message, DataTable } from 'primeng/primeng';
import { Router } from '@angular/router';
import { CustomerItemService } from '../../customerItem.service';
import { CustomerService } from '../../../customer/customer.service';

@Component({
  selector: 'customer-item-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./customerItemTable.scss'],
  templateUrl: './customerItemTable.html',
})

export class CustomerItemTable {
  rows = [];
  [x: string]: any;
  timeout: any;
  customerList: any;
  filteredCustomers: any[];
  customers: any;
  totalRecords: number;
  customer: any = { id: 0, 'code': 'ALL', 'name': '', 'display': 'All' }
  @ViewChild(DataTable) dataTable: DataTable;

  constructor(protected service: CustomerItemService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private customerService: CustomerService,
    private sharedService: SharedService) {
    this.getCustomers();
    this.loadData()
  }
  getCustomers(): void {
    this.customerService.getCombo().subscribe(customers => {
      this.customers = customers;
      this.customers.unshift({ id: 0, 'code': 'ALL', 'name': '' , 'display': 'All' });
    });
  }

  loadData() {
    if (this.customer.id != undefined && this.customer.id != 0) {
      this.service.getPageByCustomer(this.customer, 0, 20).subscribe((data: any) => {
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
    } else {
      this.service.getPage((event.first / event.rows), event.rows).subscribe((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
      });
    }
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  onRowDblclick(data: any): void {
    this.router.navigate(['/pages/customerItem/form/' + data.id]);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/customerItem/form/' + id]);
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      accept: () => {
        this.service.delete(id).subscribe(response => {
          this.sharedService.addMessage({ severity: 'info', summary: 'Deleted', detail: 'Delete success' });
          this.loadData()
        }
        );
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
    this.loadData();
  }

  /*================== End Of Customer Filter ===================*/
}


