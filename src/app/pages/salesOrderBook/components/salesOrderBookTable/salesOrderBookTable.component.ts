import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Observable } from 'rxjs/Rx';
import { CustomerService } from '../../../customer/customer.service';
import { JobService } from '../../../job/job.service';
import { DispatchScheduleService } from '../../../dispatchSchedule/dispatchSchedule.service';
import { ItemService } from '../../../item/item.service';
import { SalesOrderTypeService } from '../../../salesOrderType/salesOrderType.service';
import { SalesOrderItemService } from '../../../../services/salesOrderItem.service';
import { SalesOrderService } from '../../../salesOrder/salesOrder.service';

@Component({
  selector: 'sales-order-book-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./salesOrderBookTable.scss'],
  templateUrl: './salesOrderBookTable.html'
})
export class SalesOrderBookTable {
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
  item: any = { id: 0, code: 'ALL', display: 'All Items' };
  customer: any = { id: 0, code: 'ALL', display: 'All Customers' };
  salesOrder: any = { id: 0, code: 'ALL', display: 'All PO Numbers' };

  constructor(
    protected service: SalesOrderItemService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private customerService: CustomerService,
    private itemService: ItemService,
    private salesOrderService: SalesOrderService,
    private sharedService: SharedService
  ) {
    this.loadData();
    this.getItems();
    this.getCustomers();
    this.getSalesOrders();
  }

  getCustomers(): void {
    this.customerService.getCombo().subscribe(customers => {
      this.customers = customers;
      this.customers.unshift({ id: 0, code: 'ALL', display: 'All Customers' });
    });
  }

  getItems(): void {
    this.itemService.getCombo().subscribe(items => {
      this.items = items;
      this.items.unshift({ id: 0, code: 'ALL', display: 'All Items' });
    });
  }

  getSalesOrders(): void {
    this.salesOrderService.getCombo().subscribe(salesOrders => {
      this.salesOrders = salesOrders;
      this.salesOrders.unshift({
        id: 0,
        code: 'ALL',
        display: 'All PO Numbers'
      });
    });
  }

  loadData() {
    this.service
      .getSalesOrderInformationPage(0, 0, 0, '1970-01-01', '2100-12-31', 0, 20)
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
    this.service
      .getSalesOrderInformationPage(
        this.customer !== undefined ? this.customer.id : 0,
        this.item !== undefined ? this.item.id : 0,
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
          dispatchedQuantity += loadingPlanItem.quantity;
          if (loadingPlanItem.loadingPlan.dispatchNote !== null && loadingPlanItem.loadingPlan.dispatchNote.invoice !== null) {
            invoicedQuantity += loadingPlanItem.quantity;
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

  onCustomerSelect(customer: any) {
    console.log(event);
    this.customer = customer;
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
    console.log(event);
    this.item = item;
  }
  /*================== End Of Item Filter ===================*/
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
