import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { OperationProgressService } from '../../operationProgress.service';
import { DataTable } from 'primeng/components/datatable/datatable';
import { SectionService } from '../../../section/section.service';
import { ControlPointService } from '../../../controlPoint/controlPoint.service';
import { JobService } from '../../../job/job.service';
import { ChartService } from '../../../chart/chart.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'operation-progress-summary',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./operationProgressSummary.scss'],
  templateUrl: './operationProgressSummary.html',
})
export class OperationProgressSummary {
  @ViewChild(DataTable) dataTable: DataTable;
  operationProgress = {};
  rows = [];
  timeout: any;
  totalRecords: number;
  sections: any;
  jobs: any;
  controlPoints: any;
  section: any = {id: 0, 'code': 'Select', 'display': 'Select'};
  controlPoint: any = {id: 0, 'code': 'ALL', 'display': 'All ControlPoints'};
  job: any = {id: 0, 'code': 'ALL', 'display': 'All Jobs'};
  productionDate: Date = new Date();
  endDate: Date = new Date();
  total = 0;
  pageSize = 20;
  // productionDate = 1519929000000;//1519756200000;
  Math:any;

  constructor(protected service: OperationProgressService,
              private router: Router,
              private sectionService: SectionService,
              private chartService: ChartService,
              private controlPointService: ControlPointService,
              private jobService: JobService,
              private confirmationService: ConfirmationService,
              private sharedService: SharedService) {
    this.getSections();
    this.getControlPoints();
    this.getJobs();
    this.productionDate.setHours(0, 0, 0, 0);
    this.endDate.setHours(24, 0, 0, 0);
    this.loadData();
    this.Math = Math;

  }

  getSections(): void {
    this.sectionService.getCombo().subscribe(sections => {
      this.sections = sections;
      this.sections.unshift({id: 0, 'code': 'Select', 'display': 'Select a Sections'});
    });
  }

  getJobs(): void {
    this.jobService.getCombo().subscribe(jobs => {
      this.jobs = jobs;
      this.jobs.unshift({id: 0, 'code': 'ALL', 'display': 'All Jobs'});
    });
  }

  getControlPoints(): void {
    this.controlPointService.getCombo().subscribe(controlPoints => {
      this.controlPoints = controlPoints;
      this.controlPoints.unshift({id: 0, 'code': 'ALL', 'display': 'All ControlPoints'});
    });
  }

  loadData() {
    this.service.getPage(0, 20).subscribe((data: any) => {
      this.rows = data.content;
      this.totalRecords = data.totalElements;
      this.search(0, 0);
    });
  }

  lazy(event: any, table: any) {
    console.log(event);
    this.search((event.first / event.rows), event.rows);
  }


  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.search(event.first, event.rows);
      console.log('paged!', event);
    }, 100);
  }

  search(first: number, pageSize: number): void {
    this.chartService.getOperationProgressSummaryBySection(this.section.id, this.productionDate.getTime()).subscribe((data: any) => {
      data = JSON.parse(data._body);
      console.log(data);

      let rows = [];
      let rowSection = {id: 0, controlPointList: []};
      for (let element of data) {

        if (element.section.id !== rowSection.id) {
          if (rowSection.id !== 0) {
            rows.push(rowSection);
          }
          rowSection = element.section;
        }
        for (let operation of element.production.operationList) {
          let total = 0;
          for (let operationProgress of operation.operationProgressList) {
            total += operationProgress.quantity;
          }
          operation.total = total;
          operation.chartData = {
            labels: [operation.id, 'Loss'],

            datasets: [
              {
                data: [operation.total, (operation.plannedQuantity - operation.total)],
                backgroundColor: [
                  "#FF6384",
                  "#000000"
                ],
                hoverBackgroundColor: [
                  "#FF6384",
                  "#000000"
                ],
                options: {
                  legend: {
                    display: false
                  }
                },
              }]
          };
        }
        element.controlPoint.production = element.production;
        if (rowSection.controlPointList === undefined) {
          rowSection.controlPointList = [];
        }
        rowSection.controlPointList.push(element.controlPoint);
      }
      if(rowSection.id !== 0){
        rows.push(rowSection);
      }
      this.rows = rows;
      console.log(rows);
    });
    // pageSize = pageSize === undefined ? this.pageSize : pageSize;
    // if (this.startDate != undefined &&
    //     this.endDate != undefined &&
    //     this.section != undefined &&
    //     this.section.id != undefined &&
    //     this.job != undefined &&
    //     this.job.id != undefined &&
    //     this.controlPoint != undefined &&
    //     this.controlPoint.id != undefined) {
    //     if (this.section.id == 0 && this.controlPoint.id == 0 && this.job.id == 0) {
    //         this.service.getByProductionDurationPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
    //             this.fillTable(data);
    //         });
    //     } else if (this.section.id == 0 && this.job.id == 0 && this.controlPoint.id > 0) {
    //         this.service.getByProductionDurationAndControlPointPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.controlPoint.id, first, pageSize).subscribe((data: any) => {
    //             this.fillTable(data);
    //         });
    //     } else if (this.section.id > 0 && this.controlPoint.id == 0 && this.job.id == 0) {
    //         this.service.getBySectionAndProductionDurationPage(this.section.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
    //             this.fillTable(data);
    //         });
    //     } else if (this.section.id == 0 && this.controlPoint.id == 0 && this.job.id > 0) {
    //         this.service.getByProductionDurationAndJobPage(this.job.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
    //             this.fillTable(data);
    //         });
    //     } else if (this.section.id > 0 && this.job.id == 0 && this.controlPoint.id > 0) {
    //         this.service.getBySectionAndProductionDurationAndControlPointPage(this.section.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.controlPoint.id, first, pageSize).subscribe((data: any) => {
    //             this.fillTable(data);
    //         });
    //     } else if (this.section.id > 0 && this.controlPoint.id == 0 && this.job.id > 0) {
    //         this.service.getBySectionAndProductionDurationAndJobPage(this.section.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.job.id, first, pageSize).subscribe((data: any) => {
    //             this.fillTable(data);
    //         });
    //     } else if (this.controlPoint.id > 0 && this.section.id == 0 && this.job.id > 0) {
    //         this.service.getByControlPointAndProductionDurationAndJobPage(this.controlPoint.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.job.id, first, pageSize).subscribe((data: any) => {
    //             this.fillTable(data);
    //         });
    //     } else {
    //         this.service.getBySectionAndJobAndProductionDurationAndControlPointPage(this.section.id, this.job.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.controlPoint.id, first, pageSize, ).subscribe((data: any) => {
    //             this.fillTable(data);
    //         });
    //     }
    // } else {
    //     this.service.getPage(first, pageSize).subscribe((data: any) => {
    //         this.fillTable(data);
    //     });
    // }
  }

  selectedOperation: any;
  showInfo(operation: any, op: any, event: any) {
    this.selectedOperation = operation;
    op.show(event);
    // if (this.section.code === 'ALL') {
    //   this.chartService.getResourceUtilizationDistinctEmployeeBySectionAndStartTimeBetween(row.section.id, this.startDate.getTime(), this.endDate.getTime()).subscribe((data: any) => {
    //     this.selectedRow.employeeList = data.json();
    //     console.log(this.selectedRow);
    //     op.show(event);
    //   });
    // } else {
    //   this.chartService.getResourceUtilizationDistinctEmployeeByControlPointAndStartTimeBetween(row.controlPoint.id, this.startDate.getTime(), this.endDate.getTime()).subscribe((data: any) => {
    //     this.selectedRow.employeeList = data.json();
    //     console.log(this.selectedRow);
    //     op.show(event);
    //   });
    // }
  }

  fillTable(data: any) {
    this.rows = data.content;
    this.totalRecords = data.totalElements;
  }

  selected(data: any) {
  }

  onRowDblclick(data: any): void {
    this.router.navigate(['/pages/operationProgress/form/' + data.operation.id]);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/operationProgress/form/' + id]);
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      accept: () => {
        this.service.delete(id).subscribe(response => {
            this.sharedService.addMessage({severity: 'info', summary: 'Deleted', detail: 'Delete success'});
            this.loadData();
          }
        );
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
    this.search(0,0 );

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
