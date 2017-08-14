import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { LossReasonService } from "../../lossReason.service";
import { LossTypeService } from "../../../lossType/lossType.service";

@Component({
    selector: 'loss-reason-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./lossReasonForm.scss'],
    templateUrl: './lossReasonForm.html',
})
export class LossReasonForm {
    LossTypeList(): any {
        throw new Error("Method not implemented.");
    }
    JSON: any = JSON;

    public formGroup: FormGroup;
    lossReason: any = {};
    subscription: Subscription;

    lossTypeList = [];

    lossReasonTypes: any;
    paints: any;
 
    lossReasonDate: Date;
    lossReasonTime: Date = new Date();
    recoveryTime: Date = new Date();
    lossReasonType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }
    lossType: any = { id: '', code: '', name: '' }

    constructor(protected service: LossReasonService,
        private route: ActivatedRoute,
        private router: Router,
        private lossTypeService: LossTypeService,
        fb: FormBuilder,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            name: ['', Validators.required],
            lossType: [this.lossType, Validators.required]
            
        });
    }
  
      getLossTypeList(): void {
        this.lossTypeService.getCombo().subscribe(lossTypeList => this.lossTypeList = lossTypeList);
    }

    ngOnInit(): void {
        this.getLossTypeList();
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
            this.lossReason = data;
        }
        this.formGroup.patchValue(this.lossReason, { onlySelf: true });
        this.lossReasonType = this.lossReason.lossReasonType;
        this.lossType = this.lossReason.lossType;
        this.setDisplayOfLossType(); 
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/lossReason/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }
   /*================== Loss TypeFilter ===================*/
    filteredLossTypes: any[];
    //lossType: any;

    filterLossTypes(event) {
        let query = event.query.toLowerCase();
        this.filteredLossTypes = [];
        for (let i = 0; i < this.lossTypeList.length; i++) {
            let lossType = this.lossTypeList[i];
            if (lossType.code.toLowerCase().indexOf(query) == 0 || lossType.name.toLowerCase().indexOf(query) == 0) {
                this.filteredLossTypes.push(lossType);
            }
        }
    }

    handleLossTypeDropdownClick() {
        this.filteredLossTypes = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredLossTypes = this.lossTypeList;
        }, 100)
    }

    onLossTypeSelect(event: any) {
        this.setDisplayOfLossType();  
        }
        setDisplayOfLossType()
        {
            let lossType = this.formGroup.value.lossType;
            if (lossType != null && lossType != undefined) {
                let display = lossType.code != null && lossType.code != undefined ? lossType.code + " : " : "";
                display += lossType.name != null && lossType.name != undefined ? lossType.name : "";
                this.formGroup.value.lossType.display = display;
            }
    }
    /*================== End Of Loss TypeFilter ===================*/
   
    
}
