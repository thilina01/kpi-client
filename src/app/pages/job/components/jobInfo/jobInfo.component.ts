import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'


import { JobService } from '../../../../services/job.service';
import { SharedService } from '../../../../services/shared.service';
import { OperationService } from '../../../../services/operation.service';
@Component({
    selector: 'job-info',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./jobInfo.scss'],
    templateUrl: './jobInfo.html',
})
export class JobInfo {
    JSON: any = JSON;

    jobNo: '';

    job: any = {};
    rows = [];
    totalRecords: number;
    operationSummaryList = [];
    totalOperationSummaryRecords: number;

    constructor(protected service: JobService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService,
        private operationService: OperationService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                this.fill(id);
            }
        );
    }

    clear(): void {
        this.job = {};
        this.rows = [];
        this.totalRecords = 0;
        this.operationSummaryList = [];
        this.totalOperationSummaryRecords = 0;
    }

    keyDown(event) {
        if (event.keyCode == 13) {
            var undefined;
            this.fill(undefined);
        }
    }
    fill(id: any): void {
        this.clear();
        if (id == undefined) {
            this.service.getOneByJobNo(this.jobNo).then(
                (data) => {
                    this.job = data;
                    this.jobNo = this.job.jobNo;
                    this.fillOperations()
                    this.fillOperationSummaries()
                }
            )
        } else if (id != '0') {
            this.service.getOne(+id).then(
                (data) => {
                    this.job = data;
                    this.jobNo = this.job.jobNo;
                    this.fillOperations()
                    this.fillOperationSummaries()
                }
            )
        }
    }
    fillOperations(): void {
        this.operationService.getByJobPage(this.job.id, 0, 20).then((data: any) => {
            this.rows = data.content;
            this.totalRecords = data.totalElements;
        });
    }
    fillOperationSummaries(): void {
        this.operationService.getSummaryByJob(this.job.id, 0, 20).then((data: any) => {
            this.operationSummaryList = data;
            this.totalOperationSummaryRecords = data.length;
        });
    }
    /**/
    lazyOperations(event: any, table: any) {
        if (this.job.id != undefined) {
            this.operationService.getByJobPage(this.job.id, (event.first / event.rows), event.rows).then((data: any) => {
                //this.service.getBySectionAndProductionDateAndShiftPage(this.section.id, this.sharedService.YYYYMMDD(this.productionDate), this.shift.id, (event.first / event.rows), event.rows).then((data: any) => {
                this.rows = data.content;
                this.totalRecords = data.totalElements;
            });
        }
    }
}
