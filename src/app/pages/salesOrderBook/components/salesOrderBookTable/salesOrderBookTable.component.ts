import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { DataTable } from 'primeng/components/datatable/datatable';
import { CustomerService } from '../../../customer/customer.service';
import { SalesOrderItemService } from '../../../../services/salesOrderItem.service';
import { SalesOrderService } from '../../../salesOrder/salesOrder.service';
import { CustomerItemService } from '../../../customerItem/customerItem.service';

@Component({
  selector: 'sales-order-book-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./salesOrderBookTable.scss'],
  templateUrl: './salesOrderBookTable.html'
})
export class SalesOrderBookTable {
  customerItems: any;
  filteredCustomerItems: any[];
  filteredSalesOrders: any[];
  salesOrders: any;
  filteredCustomers: any[];
  totalRecords: number;
  filteredItems: any[];
  startDate: Date;
  customers: any;
  endDate: Date;
  pageSize = 20;
  timeout: any;
  items: any;
  jobs: any;
  rows = [];
  @ViewChild(DataTable) dataTable: DataTable;
  customerItem: any = { id: 0, code: 'ALL', display: 'All' };
  customer: any = { id: 0, code: 'ALL', display: 'All' };
  salesOrder: any = { id: 0, code: 'ALL', display: 'All' };

  constructor(
    protected service: SalesOrderItemService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private customerService: CustomerService,
    private customerItemService: CustomerItemService,
    private salesOrderService: SalesOrderService,
    private sharedService: SharedService) {
    this.loadData();
    this.getCustomers();
    this.getSalesOrders();
    this.getCustomerItems();
  }

  getCustomers(): void {
    this.customerService.getCombo().subscribe(customers => {
      this.customers = customers;
      this.customers.unshift({ id: 0, code: 'ALL', display: 'All' });
    });
  }

  getCustomerItems(): void {
    this.customerItemService.getCombo().subscribe(customerItems => {
      this.customerItems = customerItems;
      this.customerItems.unshift({ id: 0, code: 'ALL', display: 'All' });
    });
  }

  getCustomerItemByCustomer(id: number): void {
    this.customerItemService.getByCustomer(id).subscribe(customerItems => {
      this.customerItems = customerItems;
      this.customerItems.unshift({ id: 0, code: 'ALL', display: 'All' });
    });
  }

  getSalesOrders(): void {
    this.salesOrderService.getCombo().subscribe(salesOrders => {
      this.salesOrders = salesOrders;
      this.salesOrders.unshift({
        id: 0,
        code: 'ALL',
        display: 'All'
      });
    });
  }

  getSalesOrderByCustomer(id: number): void {
    this.salesOrderService.getComboByCustomer(id).subscribe(salesOrders => {
      this.salesOrders = salesOrders;
      this.salesOrders.unshift({
        id: 0,
        code: 'ALL',
        display: 'All'
      });
    });
  }

  loadData() {
    this.service
      .getSalesOrderBookPage(0, 0, 0, '1970-01-01', '2100-12-31', 0, 20)
      .subscribe((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
        this.fillTable(data);
      });
  }

  lazy(event: any, table: any) {
    console.log(event);
    this.search(event.first / event.rows, event.rows);
  }

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service.getSalesOrderBookPage(
        this.customer !== undefined ? this.customer.id : 0,
        this.customerItem !== undefined ? this.customerItem.id : 0,
        this.salesOrder !== undefined ? this.salesOrder.id : 0,
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
        this.rows = data.content;
        this.totalRecords = data.totalElements;
        this.fillTable(data);
      });
  }

  fillTable(data: any) {
    let salesOrderItemList = data.content;
    salesOrderItemList.forEach(salesOrderItem => {
      let dispatchedQuantity = 0;
      let invoicedQuantity = 0;

      salesOrderItem.dispatchScheduleList.forEach(dispatchSehedule => {
        dispatchSehedule.loadingPlanItemList.forEach(loadingPlanItem => {
          if (loadingPlanItem.loadingPlan.dispatchNote !== null) {
            dispatchedQuantity += loadingPlanItem.quantity;

            if (loadingPlanItem.loadingPlan.dispatchNote.invoice !== null) {
              invoicedQuantity += loadingPlanItem.invoiceQuantity;
            }
          }
        });
      });
      salesOrderItem.dispatchedQuantity = dispatchedQuantity;
      salesOrderItem.invoicedQuantity = invoicedQuantity;
      salesOrderItem.remainingQuantity =
      salesOrderItem.quantity - dispatchedQuantity;
      salesOrderItem.unInvoicedQuantity = salesOrderItem.quantity - invoicedQuantity;
    });

    this.rows = salesOrderItemList;
    this.totalRecords = data.totalElements;
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
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

  onCustomerSelect(selected: any) {
    console.log(selected);
    if (selected.id !== 0){
      this.getCustomerItemByCustomer(+selected.id);
      this.getSalesOrderByCustomer(+selected.id);
    }else{
      this.getCustomerItems();
      this.getSalesOrders();
    }
  }
  /*================== End Of Customer Filter ===================*/
 /*================== CustomerItem Filter ===================*/
 filterCustomerItems(event) {
  let query = event.query.toLowerCase();
  this.filteredCustomerItems = [];
  for (let i = 0; i < this.customerItems.length; i++) {
    let customerItem = this.customerItems[i];
    if (customerItem.display.toLowerCase().indexOf(query) >= 0) {
      this.filteredCustomerItems.push(customerItem);
    }
  }
}

onCustomerItemSelect(customerItem: any) {
  console.log(event);
  this.customerItem = customerItem;
}
/*================== End Of CustomerItem Filter ===================*/
  /*================== SalesOrder Filter ===================*/
  filterSalesOrders(event) {
    let query = event.query.toLowerCase();
    this.filteredSalesOrders = [];
    for (let i = 0; i < this.salesOrders.length; i++) {
      let salesOrder = this.salesOrders[i];
      if (salesOrder.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredSalesOrders.push(salesOrder);
      }
    }
  }

  onSalesOrderSelect(salesOrder: any) {
    console.log(event);
    this.salesOrder = salesOrder;
  }
  /*================== End Of SalesOrder Filter ===================*/
}
