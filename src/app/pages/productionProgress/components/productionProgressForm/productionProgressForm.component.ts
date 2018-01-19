import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { ProductionService } from '../../../production/production.service';
import { ProductionProgressService } from '../../productionProgress.service';
import { OperationService } from '../../../operation/operation.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'production-progress-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./productionProgressForm.scss'],
    templateUrl: './productionProgressForm.html',
})
export class ProductionProgressForm {
    timeSlot: any;
    @Input('formGroup')
    @ViewChild(DataTable) dataTable: DataTable;
    public productionProgressFormGroup: FormGroup;
    public formGroup: FormGroup;
    subscription: Subscription;
    productionProgressList = [];
    operation: {};
    JSON: any = JSON;
    totalRecords = 0;
    rows = [];

    constructor(protected service: OperationService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private productionProgressService: ProductionProgressService,
        private confirmationService: ConfirmationService,
        private sharedService: SharedService) {

        this.formGroup = fb.group({
            id: ['', Validators.required],
            productionProgressList: [[]]
        });
        this.productionProgressFormGroup = fb.group({
            quantity: ['', Validators.required],
            timeSlot: [this.timeSlot, Validators.required]
        });
    }

    ngOnInit(): void {

        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.loadForm(id);
                }
            }
        );
    }

    fill(): void {
        this.clear();
        let id = this.formGroup.value.id;
        if (id == undefined || id == '') { return; }
        this.loadForm(id);
    }

    clear(): void {
        this.operation = {};
    }

    keyDown(event) {
        if (event.keyCode === 13) {
            this.clear();
            this.fill();
        }
    }

    loadForm(id: any) {
        this.service.get(+id).take(1).subscribe(
            (data) => {
                if (data != null) {
                    this.operation = data;

                }
                this.formGroup.patchValue(this.operation, { onlySelf: true });
            }
        )
    }

    public onEnter(quantity: string, dt: DataTable) {
        if (this.productionProgressFormGroup.valid) {
            let values = this.productionProgressFormGroup.value;
            if (this.formGroup.value.productionProgressList == null) {
                this.formGroup.value.productionProgressList = [];
            }
            this.formGroup.value.productionProgressList.push(values);
            this.productionProgressFormGroup.reset();
            document.getElementById('timeSlotSelector').focus();
            this.formGroup.value.productionProgressList = this.formGroup.value.productionProgressList.slice();
        }
        else {
            console.log(this.productionProgressFormGroup.errors);
        }
    }

    fillProductionProgress(): void {

        this.formGroup.value.productionProgressList = this.formGroup.value.productionProgressList.slice();
        this.dataTable.reset();
    }

    public removeProductionProgress(id: number) {
        if (this.formGroup.value.productionProgressList != null) {
            this.confirmationService.confirm({
                message: 'Are you sure that you want to Delete?',
                accept: () => {
                    this.formGroup.value.productionProgressList.splice(id, 1);
                    this.fillProductionProgress();
                }
            });
        }
    }
    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(this.operation);
        if (this.formGroup.valid) {
            if (values.operation.productionProgressList === null || values.operation.productionProgressList.length === 0) {
                alert('Production Progress List Required');
                return;
            }
        }
        this.service.save(this.operation).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
            }
        );
    }

    public resetForm() {
        
        this.formGroup.reset();
        this.fill();
        this.productionProgressFormGroup.reset();
    }


    /*================== TimeSlot Filter ===================*/
    filteredTimeSlots: any[];

    timeSlots = [10, 13, 16, 19, 22, 1, 4, 7];

    filterTimeSlot(event) {
        // let query = event.query.toLowerCase();
        this.filteredTimeSlots = [];
        for (let i = 0; i < this.timeSlots.length; i++) {
            let timeSlot = this.timeSlots[i];
            this.filteredTimeSlots.push(timeSlot);
        }
    }

    /*================== End Of TimeSlot Filter ===================*/
}

