import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { ControlPointService } from '../../../../services/controlPoint.service';
import { SharedService } from '../../../../services/shared.service';
import { ControlPointTypeService } from '../../../../services/controlPointType.service';
import { WorkCenterService } from '../../../../services/workCenter.service';

@Component({
    selector: 'control-point-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./controlPointForm.scss'],
    templateUrl: './controlPointForm.html',
})
export class ControlPointForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    controlPoint: any = {};
    subscription: Subscription;

    controlPointTypes: any;
    workCenters: any;

    controlPointDate: Date;
    controlPointTime: Date = new Date();
    recoveryTime: Date = new Date();
    controlPointType: any = { id: '', code: '', name: '' }
    workCenter: any = { id: '', code: '', name: '' }


    constructor(protected service: ControlPointService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService,
        private controlPointTypeService: ControlPointTypeService,
        private workCenterService: WorkCenterService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            name: ['', Validators.required],
            controlPointType: [this.controlPointType, Validators.required],
            workCenter: [this.workCenter, Validators.required]
        });
    }

    getControlPointTypes(): void {
        this.controlPointTypeService.getAll().then(controlPointTypes => this.controlPointTypes = controlPointTypes);
    }
    
    getWorkCenterss(): void {
        this.workCenterService.getCombo().then(workCenters => this.workCenters = workCenters);
    }

    ngOnInit(): void {
        this.getControlPointTypes();
        this.getWorkCenterss();
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
            data.controlPointTime = new Date(data.controlPointTime);
            data.recoveryTime = new Date(data.recoveryTime);
            this.controlPoint = data;
        }
        this.formGroup.patchValue(this.controlPoint, { onlySelf: true });
        this.controlPointType = this.controlPoint.controlPointType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/controlPoint/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}