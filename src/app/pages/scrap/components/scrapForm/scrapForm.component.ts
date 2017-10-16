import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ScrapService } from '../../scrap.service';
import { JobService } from '../../../job/job.service';
import { SectionService } from '../../../section/section.service';
import { LossReasonService } from '../../../lossReason/lossReason.service';
import { OperationTypeService } from '../../../operationType/operationType.service';
import { ItemTypeService } from '../../../itemType/itemType.service';

@Component({
    selector: 'scrap-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./scrapForm.scss'],
    templateUrl: './scrapForm.html',
})
export class ScrapForm {
    scrapDate: any;

    JSON: any = JSON;

    public formGroup: FormGroup;
    scrap: any = {};
    subscription: Subscription;
    date: Date;

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
                    this.service.getOne(+id).subscribe(
                        (data) => {
                            this.loadForm(data);
                        }
                    )
                }
            }
        );
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
        this.setDisplayOfLossReason();
        this.setDisplayOfSection();
        this.setDisplayOfOperationType();
        this.setDisplayOfJob();
        this.setDisplayOfItemType();

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
            if (itemType.code.toLowerCase().indexOf(query) == 0 || itemType.name.toLowerCase().indexOf(query) == 0) {
                this.filteredItemTypeList.push(itemType);
            }
        }
    }

    handleItemTypeDropdownClick() {
        this.filteredItemTypeList = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredItemTypeList = this.itemTypeList;
        }, 100)
    }

    onItemTypeSelect(event: any) {
        this.setDisplayOfItemType();
    }

    setDisplayOfItemType() {
        let itemType = this.formGroup.value.itemType;
        if (itemType != null && itemType != undefined) {
            let display = itemType.code != null && itemType.code != undefined ? itemType.code + ' : ' : '';
            display += itemType.name != null && itemType.name != undefined ? itemType.name : '';
            this.formGroup.value.itemType.display = display;
        }
    }

    /*================== Loss Reason Filter ===================*/
    filteredLossReasons: any[];

    filterLossReasons(event) {
        let query = event.query.toLowerCase();
        this.filteredLossReasons = [];
        for (let i = 0; i < this.lossReasonList.length; i++) {
            let lossReason = this.lossReasonList[i];
            if (lossReason.code.toLowerCase().indexOf(query) == 0 || lossReason.name.toLowerCase().indexOf(query) == 0) {
                this.filteredLossReasons.push(lossReason);
            }
        }
    }

    handleLossReasonDropdownClick() {
        this.filteredLossReasons = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredLossReasons = this.lossReasonList;
        }, 100)
    }

    onLossReasonSelect(event: any) {

        this.setDisplayOfLossReason();
    }

    setDisplayOfLossReason() {
        let lossReason = this.formGroup.value.lossReason;
        if (lossReason != null && lossReason != undefined) {
            let display = lossReason.code != null && lossReason.code != undefined ? lossReason.code + ' : ' : '';
            display += lossReason.name != null && lossReason.name != undefined ? lossReason.name : '';
            this.formGroup.value.lossReason.display = display;
        }
    }
    /*================== End Of Loss Reason Filter ===================*/
    /*================== SectionFilter ===================*/
    filteredSectionList: any[];

    filterSectionList(event) {
        let query = event.query.toLowerCase();
        this.filteredSectionList = [];
        for (let i = 0; i < this.sectionList.length; i++) {
            let section = this.sectionList[i];
            if (section.code.toLowerCase().indexOf(query) == 0 || section.name.toLowerCase().indexOf(query) == 0) {
                this.filteredSectionList.push(section);
            }
        }
    }

    handleSectionDropdownClick() {
        this.filteredSectionList = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredSectionList = this.sectionList;
        }, 100)
    }

    onSectionSelect(event: any) {
        this.setDisplayOfSection();
    }

    setDisplayOfSection() {
        let section = this.formGroup.value.section;
        if (section != null && section != undefined) {
            let display = section.code != null && section.code != undefined ? section.code + ' : ' : '';
            display += section.name != null && section.name != undefined ? section.name : '';
            this.formGroup.value.section.display = display;
        }
    }
    /*================== JobFilter ===================*/
    filteredJobList: any[];

    filterJobList(event) {
        let query = event.query.toLowerCase();
        this.filteredJobList = [];
        for (let i = 0; i < this.jobList.length; i++) {
            let job = this.jobList[i];
            if (job.code.toLowerCase().indexOf(query) == 0 || job.name.toLowerCase().indexOf(query) == 0) {
                this.filteredJobList.push(job);
            }
        }
    }

    handleJobDropdownClick() {
        this.filteredJobList = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredJobList = this.jobList;
        }, 100)
    }

    onJobSelect(event: any) {
        this.setDisplayOfJob();
    }

    setDisplayOfJob() {
        let job = this.formGroup.value.job;
        if (job != null && job != undefined) {
            let display = job.code != null && job.code != undefined ? job.code + ' : ' : '';
            display += job.name != null && job.name != undefined ? job.name : '';
            this.formGroup.value.job.display = display;
        }
    }
    /*================== OperationTypeFilter ===================*/
    filteredOperationTypeList: any[];

    filterOperationTypeList(event) {
        let query = event.query.toLowerCase();
        this.filteredOperationTypeList = [];
        for (let i = 0; i < this.operationTypeList.length; i++) {
            let operationType = this.operationTypeList[i];
            if (operationType.code.toLowerCase().indexOf(query) == 0 || operationType.name.toLowerCase().indexOf(query) == 0) {
                this.filteredOperationTypeList.push(operationType);
            }
        }
    }

    handleOperationTypeDropdownClick() {
        this.filteredOperationTypeList = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredOperationTypeList = this.operationTypeList;
        }, 100)
    }

    onOperationTypeSelect(event: any) {
        this.setDisplayOfOperationType();
    }

    setDisplayOfOperationType() {
        let operationType = this.formGroup.value.operationType;
        if (operationType != null && operationType != undefined) {
            let display = operationType.code != null && operationType.code != undefined ? operationType.code + ' : ' : '';
            display += operationType.name != null && operationType.name != undefined ? operationType.name : '';
            this.formGroup.value.operationType.display = display;
        }
    }
}