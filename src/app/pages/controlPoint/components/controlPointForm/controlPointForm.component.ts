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
    controlPointTypeList: Array<any>;
    workCenters: any;

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

    refresh(): void {
        this.getControlPointTypeList();
        this.getWorkCenters();
    }

    loadForm(data: any) {
        if (data != null) {
            this.controlPoint = data;
        }
        this.formGroup.patchValue(this.controlPoint, { onlySelf: true });
        this.controlPointType = this.controlPoint.controlPointType;
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
            if (controlPointType.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredControlPointTypes.push(controlPointType);
            }
        }
    }
    onControlPointTypeSelect(event: any) {

    }
    /*================== End Of Control Point Type Filter ===================*/
    /*================== Work Center Filter ===================*/
    filteredWorkCenters: any[];

    filterWorkCenters(event) {
        let query = event.query.toLowerCase();
        this.filteredWorkCenters = [];
        for (let i = 0; i < this.workCenters.length; i++) {
            let workCenter = this.workCenters[i];
            if (workCenter.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredWorkCenters.push(workCenter);
            }
        }
    }

    onWorkCenterSelect(event: any) {
    }

    /*================== End Of Work Center Filter ===================*/
}
