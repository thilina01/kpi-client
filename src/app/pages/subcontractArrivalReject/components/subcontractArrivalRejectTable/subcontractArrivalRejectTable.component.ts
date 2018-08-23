import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { SubcontractArrivalRejectService } from '../../subcontractArrivalReject.service';
import { SubcontractorService } from '../../../subcontractor/subcontractor.service';
import { JobService } from '../../../job/job.service';

@Component({
  selector: 'subcontract-arrival-reject-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./subcontractArrivalRejectTable.scss'],
  templateUrl: './subcontractArrivalRejectTable.html'
})
export class SubcontractArrivalRejectTable {
  subcontractArrivalReject = {};
  rows = [];
  timeout: any;
  totalRecords: number;
  endDate: Date;
  pageSize = 20;
  startDate: Date;
  subcontractors: any;
  subcontractor: any = { id: 0, code: 'ALL', display: 'All Subcontractors' };
  job: any = { id: 0, code: 'ALL', display: 'All Jobs' };
  jobs: any;

  constructor(
    protected service: SubcontractArrivalRejectService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private subcontractorService: SubcontractorService,
    private jobService: JobService,
    private sharedService: SharedService
  ) {
    this.loadData();
    this.getSubcontractors();
    this.getJobs();
  }

  getJobs(): void {
    this.jobService.getCombo().subscribe(jobs => {
      this.jobs = jobs;
      this.jobs.unshift({ id: 0, code: 'ALL', display: 'All Jobs' });
    });
  }

  getSubcontractors(): void {
    this.subcontractorService.getCombo().subscribe(subcontractors => {
      this.subcontractors = subcontractors;
      this.subcontractors.unshift({
        id: 0,
        code: 'ALL',
        display: 'All Subcontractors'
      });
    });
  }

  loadData() {
    this.service
      .getSubcontractArrivalReject(0,0, '1970-01-01', '2100-12-31', 0, 20)
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
      .getSubcontractArrivalReject(
        this.subcontractor !== undefined ? this.subcontractor.id : 0,
        this.job !== undefined ? this.job.id : 0,
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
    this.rows = data.content;
    this.totalRecords = data.totalElements;
  }

  selected(data: any) {}

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/subcontractArrivalReject/form/' + id]);
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

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.search(event.first, event.rows);
    }, 100);
  }

  /*================== Subcontractor Filter ===================*/
  filteredSubcontractors: any[];
  filterSubcontractors(event) {
    let query = event.query.toLowerCase();
    this.filteredSubcontractors = [];
    for (let i = 0; i < this.subcontractors.length; i++) {
      let subcontractor = this.subcontractors[i];
      if (subcontractor.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredSubcontractors.push(subcontractor);
      }
    }
  }
  onSubcontractorSelect(subcontractor: any) {
    console.log(event);
    this.subcontractor = subcontractor;
  }
  /*================== Subcontractor Filter ===================*/
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
    console.log(event);
    this.job = job;
  }
  /*================== End Of Job Filter ===================*/
}
