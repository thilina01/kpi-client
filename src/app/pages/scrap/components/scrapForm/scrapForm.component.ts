import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ScrapService } from "../../scrap.service";
import { JobService } from "../../../job/job.service";
import { SectionService } from "../../../section/section.service";
import { LossReasonService } from "../../../lossReason/lossReason.service";
import { OperationTypeService } from "../../../operationType/operationType.service";
import { ProductTypeService } from "../../../productType/productType.service";

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
    date: Date;
    productType:any;

    sectionList = [];
    lossReasonList = [];
    operationTypeList = [];
    jobList = [];
    productTypeList= [];
    

    lossReason:any;
    job: any;
    section: any;
    operationType: any;
   
    constructor(protected service: ScrapService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private jobService: JobService,
        private operationTypeService: OperationTypeService,
        private sectionService: SectionService,
        private lossReasonService: LossReasonService, 
        private productTypeService: ProductTypeService,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            quantity: ['', Validators.required],
            rate: ['', Validators.required],
            date: [this.date, Validators.required],
            job: [this.job, Validators.required],
            operationType : [this.operationType , Validators.required],
            lossReason : [this.lossReason, Validators.required],
            section: [this.section, Validators.required],
            productType: [this.productType, Validators.required]
        });
    }
  
    getJobList(): void {
        this.jobService.getCombo().subscribe(jobList => this.jobList = jobList);
    }

    getOperationTypeList(): void {
        this.operationTypeService.getCombo().subscribe(operationTypeList => this.operationTypeList = operationTypeList);
    }

    getLossReasonList(): void {
        this.lossReasonService.getCombo().subscribe(lossReasonList => this.lossReasonList = lossReasonList);
    }

    getSectionList(): void {
        this.sectionService.getCombo().subscribe(sectionList => this.sectionList = sectionList);
    }
    
    getProductTypeList(): void {
        this.productTypeService.getCombo().subscribe(productTypeList => this.productTypeList = productTypeList);
    }

    ngOnInit(): void {
        this.getJobList();
        this.getOperationTypeList();
        this.getLossReasonList();
        this.getSectionList();
        this.getProductTypeList();
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
            data.date = new Date(data.date);
        }
        this.scrap = data;
        this.formGroup.patchValue(this.scrap, { onlySelf: true });
        this.job = this.scrap.job;
        this.operationType = this.scrap.operationType;
        this.lossReason = this.scrap.lossReason;
        this.section = this.scrap.section;
        this.productType = this.scrap.productType;
        this.setDisplayOfLossReason();
        this.setDisplayOfSection();
        this.setDisplayOfOperationType();
        this.setDisplayOfJob(); 
        this.setDisplayOfProductType(); 
       
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
    
 /*================== ProductTypeFilter ===================*/
filteredProductTypeList: any[];
//productType: any;

filterProductTypeList(event) {
    let query = event.query.toLowerCase();
    this.filteredProductTypeList = [];
    for (let i = 0; i < this.productTypeList.length; i++) {
        let productType = this.productTypeList[i];
        if (productType.code.toLowerCase().indexOf(query) == 0 || productType.name.toLowerCase().indexOf(query) == 0) {
            this.filteredProductTypeList.push(productType);
        }
    }
}

handleProductTypeDropdownClick() {
    this.filteredProductTypeList = [];
    //mimic remote call
    setTimeout(() => {
        this.filteredProductTypeList = this.productTypeList;
    }, 100)
}

onProductTypeSelect(event: any) {
    this.setDisplayOfProductType(); 
    }

    setDisplayOfProductType() {
        let productType = this.formGroup.value.productType;
        if (productType != null && productType != undefined) {
            let display = productType.code != null && productType.code != undefined ? productType.code + " : " : "";
            display += productType.name != null && productType.name != undefined ? productType.name : "";
            this.formGroup.value.productType.display = display;
        }
}

/*================== Loss Reason Filter ===================*/
   filteredLossReasons: any[];
   //lossReason: any;

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
           let display = lossReason.code != null && lossReason.code != undefined ? lossReason.code + " : " : "";
           display += lossReason.name != null && lossReason.name != undefined ? lossReason.name : "";
           this.formGroup.value.lossReason.display = display;
       }
   }
   /*================== End Of Loss Reason Filter ===================*/
    /*================== SectionFilter ===================*/
    filteredSectionList: any[];
    //section: any;

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
                let display = section.code != null && section.code != undefined ? section.code + " : " : "";
                display += section.name != null && section.name != undefined ? section.name : "";
                this.formGroup.value.section.display = display;
            }
    }
   /*================== JobFilter ===================*/
   filteredJobList: any[];
   //job: any;

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
               let display = job.code != null && job.code != undefined ? job.code + " : " : "";
               display += job.name != null && job.name != undefined ? job.name : "";
               this.formGroup.value.job.display = display;
           }
   }
     /*================== OperationTypeFilter ===================*/
   filteredOperationTypeList: any[];
   //operationType: any;

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
               let display = operationType.code != null && operationType.code != undefined ? operationType.code + " : " : "";
               display += operationType.name != null && operationType.name != undefined ? operationType.name : "";
               this.formGroup.value.operationType.display = display;
           }
   }
}