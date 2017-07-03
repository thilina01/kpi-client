import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ControlPointService } from '../../../../services/controlPoint.service';
import { ShiftService } from '../../../../services/shift.service';
import { ShiftTypeService } from '../../../../services/shiftType.service';


@Component({
    selector: 'plan-form-top',
    templateUrl: './planFormTop.html',
    providers: [
        ControlPointService,
        ShiftService,
        ShiftTypeService
    ]
})

export class PlanFormTop {
    @Input('formGroup')
    public formGroup: FormGroup;

    controlPoints: any[];
    shifts: any[];
    shiftTypes: any[];

    constructor(private controlPointService: ControlPointService, private shiftService: ShiftService, private shiftTypeService: ShiftTypeService) { }


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
    getShiftTypes(): void {
        this.shiftTypeService.getAll().then(shiftTypes => this.shiftTypes= shiftTypes);
    }
    ngOnInit(): void {
        this.getControlPoints();
        this.getShifts();
        this.getShiftTypes();
    }

}
