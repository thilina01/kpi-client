
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Observable } from 'rxjs/Rx';
import { CustomerService } from '../../../customer/customer.service';
import { LoadingPlanItemService } from '../../../../services/loadingPlanItem.service';
import { JobService } from '../../../job/job.service';

@Component({
  selector: 'invoice-information-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./invoiceInformationTable.scss'],
  templateUrl: './invoiceInformationTable.html',
})

export class InvoiceInformationTable {
  filteredJobs: any[];
  jobs: any;
  invoice: any;
  filteredCustomers: any[];
  rows = [];
  timeout: any;
  invoiceNumber: any;
  totalRecords: number;
  customers: any;
  startDate: Date;
  endDate: Date;
  pageSize = 20;
  @ViewChild(DataTable) dataTable: DataTable;
  customer: any = { id: 0, 'code': 'ALL', 'display': 'All Customers' };
  job: any = { id: 0, 'code': 'ALL', 'display': 'All Jobs' };

  constructor(protected service: LoadingPlanItemService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private customerService: CustomerService,
    private jobService: JobService,
    private sharedService: SharedService) {
    this.loadData();
    this.getCustomers();
    this.getJobs();
  }

  getCustomers(): void {
    this.customerService.getCombo().subscribe(customers => {
      this.customers = customers;
      this.customers.unshift({ id: 0, 'code': 'ALL', 'display': 'All Customers' });
    });
  }

  getJobs(): void {
    this.jobService.getCombo().subscribe(jobs => {
      this.jobs = jobs;
      this.jobs.unshift({ id: 0, 'code': 'ALL', 'display': 'All Jobs' });
    });
  }

  loadData() {
    this.service
      .getInvoiceInformationPage(0, 0, 0, 0, "1970-01-01", "2100-12-31", 0, 20)
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
      .getInvoiceInformationPage(
        this.invoice !== undefined ? this.invoice.id : 0,
        this.invoiceNumber !== undefined ? this.invoiceNumber : 0,
        this.customer !== undefined ? this.customer.id : 0,
        this.job !== undefined ? this.job.id : 0,
        this.startDate === undefined
          ? "1970-01-01"
          : this.sharedService.YYYYMMDD(this.startDate),
        this.endDate === undefined
          ? "2100-12-31"
          : this.sharedService.YYYYMMDD(this.endDate),
        first,
        pageSize
      )
      .subscribe((data: any) => {
        this.fillTable(data);
      });
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
}






