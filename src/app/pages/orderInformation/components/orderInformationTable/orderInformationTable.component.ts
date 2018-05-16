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

@Component({
  selector: 'order-information-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./orderInformationTable.scss'],
  templateUrl: './orderInformationTable.html'
})
export class OrderInformationTable {
  filteredCustomers: any[];
  totalRecords: number;
  salesOrderTypes: any;
  filteredItems: any[];
  filteredJobs: any[];
  startDate: Date;
  customers: any;
  endDate: Date;
  pageSize = 20;
  timeout: any;
  items: any;
  jobs: any;
  rows = [];
  @ViewChild(DataTable) dataTable: DataTable;
  job: any = { id: 0, 'code': 'ALL', 'display': 'All Jobs' };
  item: any = { id: 0, 'code': 'ALL', 'display': 'All Items' };
  customer: any = { id: 0, code: 'ALL', 'display': 'All Customers' };
  salesOrderType: any = { id: 0, 'code': 'ALL', 'display': 'All SalesOrderTypes'};

  constructor(protected service: DispatchScheduleService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private salesOrderTypeService: SalesOrderTypeService,
    private customerService: CustomerService,
    private jobService: JobService,
    private itemService: ItemService,
    private sharedService: SharedService) {
    this.getJobs();
    this.loadData();
    this.getItems();
    this.getCustomers();
    this.getSalesOrderTypes();
  }

  getCustomers(): void {
    this.customerService.getCombo().subscribe(customers => {
      this.customers = customers;
      this.customers.unshift({ id: 0, code: 'ALL', display: 'All Customers' });
    });
  }

  getJobs(): void {
    this.jobService.getCombo().subscribe(jobs => {
      this.jobs = jobs;
      this.jobs.unshift({ id: 0, 'code': 'ALL', 'display': 'All Jobs' });
    });
  }

  getItems(): void {
    this.itemService.getCombo().subscribe(items => {
      this.items = items;
      this.items.unshift({ id: 0, 'code': 'ALL', 'display': 'All Items' });
    });
  }

  getSalesOrderTypes(): void {
    this.salesOrderTypeService.getCombo().subscribe(salesOrderTypes => {
        this.salesOrderTypes = salesOrderTypes;
        this.salesOrderTypes.unshift({ id: 0, 'code': 'ALL', 'display': 'All SalesOrderTypes' });
    });
  }

  loadData() {
    this.service
      .getOrderInformationPage(0, 0, 0, 0, '1970-01-01', '2100-12-31', 0, 20)
      .subscribe((data: any) => {
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
        .getOrderInformationPage(
          this.customer !== undefined ? this.customer.id : 0,
          this.job !== undefined ? this.job.id : 0,
          this.item !== undefined ? this.item.id : 0,
          this.salesOrderType !== undefined ? this.salesOrderType.id : 0,
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

  fillTable(data: any) {
    let content = data.content;
    content.forEach(dispatchSehedule => {
      let dispatchedQuantity = 0;
      dispatchSehedule.loadingPlanItemList.forEach(loadingPlanItem => {
        dispatchedQuantity += loadingPlanItem.quantity;
      });
    dispatchSehedule.dispatchedQuantity = dispatchedQuantity;
    dispatchSehedule.remainingQuantity = dispatchSehedule.quantity - dispatchedQuantity;
    });
    this.rows = content;
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
  /*================== Job Filter ===================*/
   filterJobs(event) {
    let query = event.query.toLowerCase();
    this.filteredJobs = [];
    for (let i = 0; i < this.jobs.length; i++) {
      let job = this.jobs[i];
      if (job.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredJobs.push(job);
      }
    }
  }

  onJobSelect(job: any) {
    console.log(event);
    this.job = job;

  }

  /*================== End Of Job Filter ===================*/
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

}
/*================== End Of Item Filter ===================*/
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
/*================== End of SalesOrderType Filter ===================*/

}
