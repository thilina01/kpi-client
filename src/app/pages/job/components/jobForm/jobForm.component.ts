import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ItemService } from "../../../item/item.service";
import { JobService } from "../../job.service";
import { JobTypeService } from "../../../jobType/jobType.service";

@Component({
    selector: 'job-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./jobForm.scss'],
    templateUrl: './jobForm.html',
})
export class JobForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    job: any = {};
    subscription: Subscription;

    jobTypes: any;
    items: any;

    jobDate: Date;
    jobTime: Date = new Date();
    recoveryTime: Date = new Date();
    jobType: any = { id: '', code: '', type: '' }
    item: any = { id: '', code: '', description: '' }

    constructor(protected service: JobService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService,
        private jobTypeService: JobTypeService,
        private itemService: ItemService) {

        this.formGroup = fb.group({
            id: '',
            jobNo: ['', Validators.required],
            jobDate: [this.jobDate, Validators.required],
            quantity: ['', Validators.required],
            jobType: [this.jobType, Validators.required],
            item: [this.item, Validators.required]
        });
    }

    getJobTypes(): void {
        this.jobTypeService.getCombo().subscribe(jobTypes => this.jobTypes = jobTypes);
    }
    
    getItems(): void {
        this.itemService.getCombo().subscribe(items => this.items = items);
    }

    ngOnInit(): void {
        this.getJobTypes();
        this.getItems();
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
            this.job = data;
            this.job.item.name = this.job.item.description;
        }
        this.formGroup.patchValue(this.job, { onlySelf: true });
        this.jobType = this.job.jobType;
        this.setDisplayOfJobType(); 
        this.setDisplayOfItem();  
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/job/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }
     /*================== Job Type Filter ===================*/
    filteredJobTypes: any[];
    //jobType: any;

    filterJobTypes(event) {
        let query = event.query.toLowerCase();
        this.filteredJobTypes = [];
        for (let i = 0; i < this.jobTypes.length; i++) {
            let jobType = this.jobTypes[i];
            if (jobType.code.toLowerCase().indexOf(query) == 0 || jobType.name.toLowerCase().indexOf(query) == 0) {
                this.filteredJobTypes.push(jobType);
            }
        }
    }

    handleJobTypeDropdownClick() {
        this.filteredJobTypes = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredJobTypes = this.jobTypes;
        }, 100)
    }
    onJobTypeSelect(event: any) {
        this.setDisplayOfJobType();        
    }


    setDisplayOfJobType(){
        let jobType = this.formGroup.value.jobType;
        if (jobType != null && jobType != undefined) {
            let display = jobType.code != null && jobType.code != undefined ? jobType.code + " : " : "";
            display += jobType.name != null && jobType.name != undefined ? jobType.name : "";
            this.formGroup.value.jobType.display = display;
        }
    }
    /*================== End Of Job Type Filter ===================*/
  /*================== Item Filter ===================*/
    filteredItems: any[];
    //item: any;

    filterItems(event) {
        let query = event.query.toLowerCase();
        this.filteredItems = [];
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if (item.code.toLowerCase().indexOf(query) == 0 || item.name.toLowerCase().indexOf(query) == 0) {
                this.filteredItems.push(item);
            }
        }
    }

    handleItemDropdownClick() {
        this.filteredItems = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredItems = this.items;
        }, 100)
    }

    onItemSelect(event: any) {
        this.setDisplayOfItem();        
    }

    setDisplayOfItem(){
        let item = this.formGroup.value.item;
        if (item != null && item != undefined) {
            let display = item.code != null && item.code != undefined ? item.code + " : " : "";
            display += item.name != null && item.name != undefined ? item.name : "";
            this.formGroup.value.item.display = display;
        }
    }
    /*================== End Of Item Filter ===================*/
    }

