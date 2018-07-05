import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { OperationProgressService } from '../../operationProgress.service';
import { DataTable } from 'primeng/components/datatable/datatable';
import { SectionService } from '../../../section/section.service';
import { ControlPointService } from '../../../controlPoint/controlPoint.service';
import { JobService } from '../../../job/job.service';

@Component({
  selector: 'operation-progress-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./operationProgressTable.scss'],
  templateUrl: './operationProgressTable.html'
})
export class OperationProgressTable {
  @ViewChild(DataTable) dataTable: DataTable;
  operationProgress = {};
  rows = [];
  timeout: any;
  totalRecords: number;
  sections: any;
  jobs: any;
  controlPoints: any;
  section: any = { id: 0, code: 'ALL', display: 'All Sections' };
  controlPoint: any = { id: 0, code: 'ALL', display: 'All ControlPoints' };
  job: any = { id: 0, code: 'ALL', display: 'All Jobs' };
  startDate: Date = new Date();
  endDate: Date = new Date();
  total = 0;
  pageSize = 20;
  constructor(
    protected service: OperationProgressService,
    private router: Router,
    private sectionService: SectionService,
    private controlPointService: ControlPointService,
    private jobService: JobService,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService
  ) {
    this.loadData();
    this.getSections();
    this.getControlPoints();
    this.getJobs();
    this.startDate.setHours(0, 0, 0, 0);
    this.endDate.setHours(24, 0, 0, 0);
    this.search(0, 0);
  }

  getSections(): void {
    this.sectionService.getCombo().subscribe(sections => {
      this.sections = sections;
      this.sections.unshift({ id: 0, code: 'ALL', display: 'All Sections' });
    });
  }

  getJobs(): void {
    this.jobService.getCombo().subscribe(jobs => {
      this.jobs = jobs;
      this.jobs.unshift({ id: 0, code: 'ALL', display: 'All Jobs' });
    });
  }

  getControlPoints(): void {
    this.controlPointService.getCombo().subscribe(controlPoints => {
      this.controlPoints = controlPoints;
      this.controlPoints.unshift({
        id: 0,
        code: 'ALL',
        display: 'All ControlPoints'
      });
    });
  }

  loadData() {
    this.service
      .getControlPointAndSectionAndJobAndProductionDateBetweenPage(
        0,
        0,
        '1970-01-01',
        '2100-12-31',
        0,
        0,
        20
      )
      .subscribe((data: any) => {
        this.fillTable(data);
        this.startDate.setHours(0, 0, 0, 0);
        this.endDate.setHours(24, 0, 0, 0);
        this.search(0, 0);
      });
  }

  lazy(event: any, table: any) {
    console.log(event);
    this.search(event.first / event.rows, event.rows);
  }

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service
      .getControlPointAndSectionAndJobAndProductionDateBetweenPage(
        this.section !== undefined ? this.section.id : 0,
        this.job !== undefined ? this.job.id : 0,
        this.startDate === undefined
          ? '1970-01-01'
          : this.sharedService.YYYYMMDD(this.startDate),
        this.endDate === undefined
          ? '2100-12-31'
          : this.sharedService.YYYYMMDD(this.endDate),
        this.controlPoint !== undefined ? this.controlPoint.id : 0,
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

  fillTable(data: any) {
    this.rows = data.content;
    this.totalRecords = data.totalElements;
  }

  selected(data: any) {}

  onRowDblclick(data: any): void {
    this.router.navigate([
      '/pages/operationProgress/form/' + data.operation.id
    ]);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/operationProgress/form/' + id]);
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

  /*================== ControlPoint Filter ===================*/
  filteredControlPoints: any[];
  filterControlPoints(event) {
    let query = event.query.toLowerCase();
    this.filteredControlPoints = [];
    for (let i = 0; i < this.controlPoints.length; i++) {
      let controlPoint = this.controlPoints[i];
      if (controlPoint.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredControlPoints.push(controlPoint);
      }
    }
  }
  onControlPointSelect(controlPoint: any) {
    console.log(event);
  }
  /*================== End Of ControlPoint Filter ===================*/
  /*================== Section Filter ===================*/
  filteredSections: any[];
  filterSections(event) {
    let query = event.query.toLowerCase();
    this.filteredSections = [];
    for (let i = 0; i < this.sections.length; i++) {
      let section = this.sections[i];
      if (section.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredSections.push(section);
      }
    }
  }
  onSectionSelect(section: any) {
    console.log(event);
  }
  /*================== End Of Section Filter ===================*/
  /*================== Job Filter ===================*/
  filteredJobs: any[];
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
  }
  /*================== End Of Job Filter ===================*/
}
