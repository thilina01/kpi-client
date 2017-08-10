import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'



import { SharedService } from '../../../../services/shared.service';
import { DataTable } from "primeng/primeng";
import { JobService } from "../../job.service";
import { OperationService } from "../../../operation/operation.service";
@Component({
    selector: 'job-info',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./jobInfo.scss'],
    templateUrl: './jobInfo.html',
})
export class JobInfo {

    @ViewChild(DataTable) dataTableComponent: DataTable;
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
        this.dataTableComponent.reset();
    }

    keyDown(event) {
        if (event.keyCode == 13) {
            this.clear();
            var undefined;
            this.fill(undefined);
        }
    }
    fill(id: any): void {
        this.clear();
        if (id == undefined) {
            this.service.getOneByJobNo(this.jobNo).subscribe(
                (data) => {
                    if (data != null) {
                        this.job = data;
                        this.jobNo = this.job.jobNo;
                        this.fillOperations()
                        this.fillOperationSummaries()
                    }
                }
            )
        } else if (id != '0') {
            this.service.getOne(+id).subscribe(
                (data) => {
                    if (data != null) {
                        this.job = data;
                        this.jobNo = this.job.jobNo;
                        this.fillOperations()
                        this.fillOperationSummaries()
                    }
                }
            )
        }
    }
    fillOperations(): void {
        this.operationService.getByJobPage(this.job.id, 0, 20).subscribe((data: any) => {
            this.rows = data.content;
            this.totalRecords = data.totalElements;
        });
    }
    fillOperationSummaries(): void {
        this.operationService.getSummaryByJob(this.job.id, 0, 20).subscribe((data: any) => {
            this.operationSummaryList = data;
            this.totalOperationSummaryRecords = data.length;
        });
    }
    /**/
    lazyOperations(event: any, table: any) {
        if (this.job.id != undefined) {
            this.operationService.getByJobPage(this.job.id, (event.first / event.rows), event.rows).subscribe((data: any) => {
                //this.service.getBySectionAndProductionDateAndShiftPage(this.section.id, this.sharedService.YYYYMMDD(this.productionDate), this.shift.id, (event.first / event.rows), event.rows).then((data: any) => {
                this.rows = data.content;
                this.totalRecords = data.totalElements;
            });
        }
    }
}
