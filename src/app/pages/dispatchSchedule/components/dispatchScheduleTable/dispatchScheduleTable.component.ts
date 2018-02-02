
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message, DataTable } from 'primeng/primeng';
import { Router } from '@angular/router';
import { DispatchScheduleService } from '../../dispatchSchedule.service';
import { CustomerService } from '../../../customer/customer.service';
import { JobService } from '../../../job/job.service';

@Component({
  selector: 'dispatch-schedule-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dispatchScheduleTable.scss'],
  templateUrl: './dispatchScheduleTable.html',
})

export class DispatchScheduleTable {
  rows = [];
  timeout: any;
  totalRecords: number;
  @ViewChild(DataTable) dataTable: DataTable;
  startDate: Date;
  endDate: Date;
  customers: any;
  jobs: any;
  customer: any = { id: 0, 'code': 'ALL', 'display': 'All Customers' }
  job: any = { id: 0, 'code': 'ALL', 'display': 'All Jobs' }

  constructor(protected service: DispatchScheduleService,
    private router: Router,
    private customerService: CustomerService,
    private jobService: JobService,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService) {
    this.loadData();
    this.getCustomers();
    this.getJobs();

  }
  getJobs(): void {
    this.jobService.getCombo().subscribe(jobs => {
      this.jobs = jobs;
      this.jobs.unshift({ id: 0, 'code': 'ALL', 'display': 'All Jobs' });
    });
  }
  getCustomers(): void {
    this.customerService.getCombo().subscribe(customers => {
      this.customers = customers;
      this.customers.unshift({ id: 0, 'code': 'ALL', 'display': 'All Customers' });
    });
  }
  loadData() {
    if (this.customer.id != undefined && this.customer.id != 0) {
      this.service.getPageByCustomer(this.customer, 0, 20).subscribe((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
      });
    } 
  else if (this.job.id != undefined && this.job.id != 0) {
      this.service.getPageByJob(this.job, 0, 20).subscribe((data: any) => {
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

   else if (this.job.id != undefined && this.job.id != 0) {
      this.service.getPageByJob(this.job, (event.first / event.rows), event.rows).subscribe((data: any) => {
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

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.search(event.first, event.rows);
    }, 100);
  }

  search(first: number, pageSize: number): void {
    if (this.startDate != undefined &&
      this.endDate != undefined &&
      this.customer != undefined &&
      this.customer.id != undefined &&
      this.job != undefined &&
      this.job.id != undefined) {
      if (this.customer.id == 0 && this.job.id == 0) {
        this.service.getByDispatchScheduleDurationPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
          this.fillTable(data);
        });
      } else if (this.customer.id == 0 && this.job.id > 0) {
        this.service.getByDispatchScheduleDurationAndJobPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.job.id, first, pageSize).subscribe((data: any) => {
          this.fillTable(data);
        });

      } else if (this.customer.id > 0 && this.job.id == 0) {
        this.service.getByCustomerAndDispatchScheduleDurationPage(this.customer.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
          this.fillTable(data);
        });
      } else {
        this.service.getByCustomerAndDispatchScheduleDurationAndJobPage(this.customer.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.job.id, first, pageSize).subscribe((data: any) => {
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

  onRowDblclick(data: any): void {
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/dispatchSchedule/form/' + id]);
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
  filteredCustomers: any[];
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
  /*================== Job Filter ===================*/
  filteredJobs: any[];
  filterJobs(event) {
    let query = event.query.toLowerCase();
    this.filteredJobs = [];
    for (let i = 0; i < this.jobs.length; i++) {
      let job = this.jobs[i];
      if (job.code.toLowerCase().indexOf(query) >= 0) {
        this.filteredJobs.push(job);
      }
    }
  }
  onJobSelect(job: any) {
    console.log(event)
    this.job = job;
    this.loadData();
  }
  /*================== End Of Job Filter ===================*/
}
