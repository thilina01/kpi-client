import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ControlPointService } from '../../../../services/controlPoint.service';
import { ShiftService } from '../../../../services/shift.service';


@Component({
    selector: 'plan-form-top',
    templateUrl: './planFormTop.html',
    providers: [
        ControlPointService,
        ShiftService
    ]
})

export class PlanFormTop {
    @Input('formGroup')
    public formGroup: FormGroup;

    controlPoints: Array<Object>;
    shifts: Object[];

    constructor(private controlPointService: ControlPointService, private shiftService: ShiftService) { }


    search(event) {
        console.log(event.query);
        this.shiftService.getAll().then(shifts => this.shifts = shifts);
        /*
        this.mylookupservice.getResults(event.query).then(data => {
            this.results = data;
        });*/
    }
    a() {
        console.log(this.formGroup.value.controlPoint);
    }
    searchControlPoint(event) {
        this.controlPointService.getAll().then(controlPoints => this.controlPoints = controlPoints);
    }

    getControlPoints(): void {
        this.controlPointService.getCombo().then(controlPoints => this.controlPoints = controlPoints);
    }

    getShifts(): void {
        this.shiftService.getAll().then(shifts => this.shifts = shifts);
    }
    ngOnInit(): void {
        this.getControlPoints();
        this.getShifts();
    }

}
