import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { JobService } from '../../../../services/job.service';
import { SharedService } from '../../../../services/shared.service';
import { JobTypeService } from '../../../../services/jobType.service';
import { ItemService } from '../../../../services/item.service';

@Component({
    selector: 'job-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./jobForm.scss'],
    templateUrl: './jobForm.html',
})
export class JobForm {
    jobtypes: any[];
    types: any;
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
            jobDate: ['', Validators.required],
            quantity: ['', Validators.required],
            jobType: [this.jobType, Validators.required],
            item: [this.item, Validators.required]
        });
    }

    getJobTypes(): void {
        this.jobTypeService.getCombo().then(jobTypes => this.jobTypes = jobTypes);
    }
    
    getItems(): void {
        this.itemService.getCombo().then(items => this.items = items);
    }

    ngOnInit(): void {
        this.getJobTypes();
        this.getItems();
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.getOne(+id).then(
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
            data.jobTime = new Date(data.jobTime);
            data.recoveryTime = new Date(data.recoveryTime);
            this.job = data;
        }
        this.formGroup.patchValue(this.job, { onlySelf: true });
        this.jobType = this.job.jobType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
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
     /*================== JobTypeFilter ===================*/
    filteredJobTypes: any[];
    type: any;

    filterJobTypes(event) {
        let query = event.query.toLowerCase();
        this.filteredJobTypes = [];
        for (let i = 0; i < this.jobTypes.length; i++) {
            let jobtype = this.jobtypes[i];
            if (jobtype.code.toLowerCase().indexOf(query) == 0 || jobtype.name.toLowerCase().indexOf(query) == 0) {
                this.filteredJobTypes.push(jobtype);
            }
        }
    }

    handleJobTypeDropdownClick() {
        this.filteredJobTypes = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredJobTypes = this.jobtypes;
        }, 100)
    }

    onSelect(jobtype:any) {
        console.log(event)
    }
    /*================== End Of Type Filter ===================*/
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

    onItemSelect(item: any) {
        console.log(event)
    }
    /*================== End Of Item Filter ===================*/
}
