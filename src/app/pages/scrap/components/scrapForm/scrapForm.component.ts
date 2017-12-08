import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ScrapService } from '../../scrap.service';
import { JobService } from '../../../job/job.service';
import { SectionService } from '../../../section/section.service';
import { LossReasonService } from '../../../lossReason/lossReason.service';
import { OperationTypeService } from '../../../operationType/operationType.service';
import { ItemTypeService } from '../../../itemType/itemType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'scrap-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./scrapForm.scss'],
    templateUrl: './scrapForm.html',
})
export class ScrapForm {

    JSON: any = JSON;

    public formGroup: FormGroup;
    scrap: any = {};
    subscription: Subscription;
    scrapDate: Date;

    sectionList = [];
    lossReasonList = [];
    operationTypeList = [];
    jobList = [];
    itemTypeList = [];

    constructor(protected service: ScrapService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private jobService: JobService,
        private operationTypeService: OperationTypeService,
        private sectionService: SectionService,
        private lossReasonService: LossReasonService,
        private itemTypeService: ItemTypeService,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            quantity: ['', Validators.required],
            unitValue: ['', Validators.required],
            scrapDate: [this.scrapDate, Validators.required],
            job: ['', Validators.required],
            operationType: ['', Validators.required],
            lossReason: ['', Validators.required],
            section: ['', Validators.required],
            itemType: ['', Validators.required]
        });
    }

    getJobList(): void {
        this.jobService.getCombo().subscribe(jobList => this.jobList = jobList);
    }

    getOperationTypeList(): void {
        this.operationTypeService.getCombo().subscribe(operationTypeList => this.operationTypeList = operationTypeList);
    }

    getScrapReasonList(): void {
        this.lossReasonService.getComboByLossType({ code: 'ST' }).subscribe(lossReasonList => this.lossReasonList = lossReasonList);
    }

    getSectionList(): void {
        this.sectionService.getCombo().subscribe(sectionList => this.sectionList = sectionList);
    }

    getItemTypeList(): void {
        this.itemTypeService.getCombo().subscribe(itemTypeList => this.itemTypeList = itemTypeList);
    }

    ngOnInit(): void {
        this.getJobList();
        this.getOperationTypeList();
        this.getScrapReasonList();
        this.getSectionList();
        this.getItemTypeList();
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.get(+id).take(1).subscribe(
                        (data) => {
                            this.loadForm(data);
                        }
                    )
                }
            }
        );
    }

    refresh(): void {
        this.getJobList();
        this.getOperationTypeList();
        this.getScrapReasonList();
        this.getSectionList();
        this.getItemTypeList();
    }

    loadForm(data: any) {
        if (data != null) {
            this.scrap = data;
            data.scrapDate = new Date(data.scrapDate);
            data.job.code = data.job.jobNo;
            data.job.name = data.job.jobDate;
        }
        this.scrap = data;
        this.formGroup.patchValue(data, { onlySelf: true });
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/scrap/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();

    }

    /*================== ItemTypeFilter ===================*/
    filteredItemTypeList: any[];

    filterItemTypeList(event) {
        let query = event.query.toLowerCase();
        this.filteredItemTypeList = [];
        for (let i = 0; i < this.itemTypeList.length; i++) {
            let itemType = this.itemTypeList[i];
            if (itemType.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredItemTypeList.push(itemType);
            }
        }
    }

    onItemTypeSelect(event: any) {
    }
    /*================== Loss Reason Filter ===================*/
    filteredLossReasons: any[];

    filterLossReasons(event) {
        let query = event.query.toLowerCase();
        this.filteredLossReasons = [];
        for (let i = 0; i < this.lossReasonList.length; i++) {
            let lossReason = this.lossReasonList[i];
            if (lossReason.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredLossReasons.push(lossReason);
            }
        }
    }

    onLossReasonSelect(event: any) {

    }
    /*================== End Of Loss Reason Filter ===================*/
    /*================== SectionFilter ===================*/
    filteredSectionList: any[];

    filterSectionList(event) {
        let query = event.query.toLowerCase();
        this.filteredSectionList = [];
        for (let i = 0; i < this.sectionList.length; i++) {
            let section = this.sectionList[i];
            if (section.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredSectionList.push(section);
            }
        }
    }

    onSectionSelect(event: any) {
    }

    /*================== JobFilter ===================*/
    filteredJobList: any[];

    filterJobList(event) {
        let query = event.query.toLowerCase();
        this.filteredJobList = [];
        for (let i = 0; i < this.jobList.length; i++) {
            let job = this.jobList[i];
            if (job.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredJobList.push(job);
            }
        }
    }

    onJobSelect(event: any) {
    }
    /*================== OperationTypeFilter ===================*/
    filteredOperationTypeList: any[];

    filterOperationTypeList(event) {
        let query = event.query.toLowerCase();
        this.filteredOperationTypeList = [];
        for (let i = 0; i < this.operationTypeList.length; i++) {
            let operationType = this.operationTypeList[i];
            if (operationType.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredOperationTypeList.push(operationType);
            }
        }
    }

    onOperationTypeSelect(event: any) {
    }
}
