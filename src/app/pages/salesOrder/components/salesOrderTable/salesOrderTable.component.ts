import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { SalesOrderService } from '../../salesOrder.service';
import { DataTable } from 'primeng/components/datatable/datatable';
import { CustomerService } from '../../../customer/customer.service';
import { SalesOrderTypeService } from '../../../salesOrderType/salesOrderType.service';
import { PrintService } from '../../../../services/print.service';

@Component({
  selector: 'sales-order-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./salesOrderTable.scss'],
  templateUrl: './salesOrderTable.html'
})
export class SalesOrderTable {
  customerPoNumbers: any;
  table: any;
  filteredCustomers: any[];
  salesOrder = {};
  salesOrderId: number = 0;
  rows = [];
  pageSize = 20;
  timeout: any;
  salesOrderTypes: any;
  customers: any;
  customerPoNumber: any;
  totalRecords: number;
  @ViewChild(DataTable) dataTable: DataTable;
  salesOrderType: any = { id: 0, code: 'ALL', display: 'All SalesOrderTypes' };
  customer: any = { id: 0, code: 'ALL', display: 'All Customers' };
  startDate: Date;
  endDate: Date;
  constructor(
    protected service: SalesOrderService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private salesOrderTypeService: SalesOrderTypeService,
    private customerService: CustomerService,
    private printService: PrintService,
    private sharedService: SharedService
  ) {
    this.loadData();
    this.getCustomers();
    this.getSalesOrderTypes();
  }

  getCustomers(): void {
    this.customerService.getCombo().subscribe(customers => {
      this.customers = customers;
      this.customers.unshift({ id: 0, code: 'ALL', display: 'All Customers' });
    });
  }

  getSalesOrderTypes(): void {
    this.salesOrderTypeService.getCombo().subscribe(salesOrderTypes => {
      this.salesOrderTypes = salesOrderTypes;
      this.salesOrderTypes.unshift({
        id: 0,
        code: 'ALL',
        display: 'All SalesOrderTypes'
      });
    });
  }

  loadData() {
    this.service
      .getSalesOrderPage(0, 0, 0, '1970-01-01', '2100-12-31', 0, 20)
      .subscribe((data: any) => {
        this.fillTable(data);
      });
  }

  lazy(event: any, table: any) {
    console.log(event);
    this.search(event.first / event.rows, event.rows);
  }
  fillTable(data: any) {
    this.rows = data.content;
    this.totalRecords = data.totalElements;
  }

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service
      .getSalesOrderPage(
        this.customer !== undefined ? this.customer.id : 0,
        this.salesOrderType !== undefined ? this.salesOrderType.id : 0,
        this.customerPoNumber !== undefined ? this.customerPoNumber : 0,
        this.startDate === undefined
          ? '1970-01-01'
          : this.sharedService.YYYYMMDD(this.startDate),
        this.endDate === undefined
          ? '2100-12-31'
          : this.sharedService.YYYYMMDD(this.endDate),
        first,
        pageSize
      )
      .subscribe((data: any) => {
        this.fillTable(data);
      });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.search(event.first, event.rows);
      console.log('paged!', event);
    }, 100);
  }

  selected(data: any) {}

  onRowDblclick(data: any): void {
    window.open('/#/pages/salesOrder/form/' + data.id, '_blank');
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/salesOrder/form/' + id]);
  }

  print(id: number) {
    this.salesOrderId = id;
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

  /*================== SalesOrderType Filter ===================*/
  filteredSalesOrderTypes: any[];
  filterSalesOrderTypes(event) {
    let query = event.query.toLowerCase();
    this.filteredSalesOrderTypes = [];
    for (let i = 0; i < this.salesOrderTypes.length; i++) {
      let salesOrderType = this.salesOrderTypes[i];
      if (salesOrderType.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredSalesOrderTypes.push(salesOrderType);
      }
    }
  }
  onSalesOrderTypeSelect(salesOrderType: any) {
    console.log(event);
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
    console.log(event);
    // this.customer = customer;
  }

  /*================== End Of Customer Filter ===================*/
}
