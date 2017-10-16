import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ControlPointService } from '../../controlPoint.service';
import { ControlPointTypeService } from '../../../controlPointType/controlPointType.service';
import { WorkCenterService } from '../../../workCenter/workCenter.service';

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
    paymentTermList = [];
    controlPointTypeList: Array<any>;
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

    getControlPointTypeList(): void {
        this.controlPointTypeService.getAll().subscribe(controlPointTypeList => this.controlPointTypeList = controlPointTypeList);
    }

    getWorkCenters(): void {
        this.workCenterService.getCombo().subscribe(workCenters => this.workCenters = workCenters);
    }

    ngOnInit(): void {
        this.getControlPointTypeList();
        this.getWorkCenters();
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
            this.controlPoint = data;
        }
        this.formGroup.patchValue(this.controlPoint, { onlySelf: true });
        this.controlPointType = this.controlPoint.controlPointType;
        this.setDisplayOfWorkCenter();
        this.setDisplayOfControlPoint();
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
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
    /*================== Control Point Type Filter ===================*/
    filteredControlPointTypes: any[];

    filterControlPointTypes(event) {
        let query = event.query.toLowerCase();
        this.filteredControlPointTypes = [];
        for (let i = 0; i < this.controlPointTypeList.length; i++) {
            let controlPointType = this.controlPointTypeList[i];
            if (controlPointType.code.toLowerCase().indexOf(query) == 0 || controlPointType.name.toLowerCase().indexOf(query) == 0) {
                this.filteredControlPointTypes.push(controlPointType);
            }
        }
    }

    handleControlPointTypeDropdownClick() {
        this.filteredControlPointTypes = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredControlPointTypes = this.controlPointTypeList;
        }, 100)
    }

    onControlPointTypeSelect(event: any) {

        this.setDisplayOfControlPoint();
    }
    setDisplayOfControlPoint() {
        let controlPointType = this.formGroup.value.controlPointType;
        if (controlPointType != null && controlPointType != undefined) {
            let display = controlPointType.code != null && controlPointType.code != undefined ? controlPointType.code + ' : ' : '';
            display += controlPointType.name != null && controlPointType.name != undefined ? controlPointType.name : '';
            this.formGroup.value.controlPointType.display = display;
        }
    }
    /*================== End Of Control Point Type Filter ===================*/
    /*================== Work Center Filter ===================*/
    filteredWorkCenters: any[];

    filterWorkCenters(event) {
        let query = event.query.toLowerCase();
        this.filteredWorkCenters = [];
        for (let i = 0; i < this.workCenters.length; i++) {
            let workCenter = this.workCenters[i];
            if (workCenter.code.toLowerCase().indexOf(query) == 0 || workCenter.name.toLowerCase().indexOf(query) == 0) {
                this.filteredWorkCenters.push(workCenter);
            }
        }
    }
    handleWorkCenterDropdownClick() {
        this.filteredWorkCenters = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredWorkCenters = this.workCenters;
        }, 100)
    }

    onWorkCenterSelect(event: any) {
        this.setDisplayOfWorkCenter();
    }

    setDisplayOfWorkCenter() {
        let workCenter = this.formGroup.value.workCenter;
        if (workCenter != null && workCenter != undefined) {
            let display = workCenter.code != null && workCenter.code != undefined ? workCenter.code + ' : ' : '';
            display += workCenter.name != null && workCenter.name != undefined ? workCenter.name : '';
            this.formGroup.value.workCenter.display = display;
        }

    }
    /*================== End Of Work Center Filter ===================*/
}
