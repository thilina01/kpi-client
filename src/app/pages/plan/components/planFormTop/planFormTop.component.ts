import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlPointService } from "../../../controlPoint/controlPoint.service";
import { ShiftService } from "../../../shift/shift.service";
import { ShiftTypeService } from "../../../shiftType/shiftType.service";


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

    getControlPoints(): void {
        this.controlPointService.getCombo().then(controlPoints => {
            this.controlPoints = controlPoints;
            // this.controlPoint = this.controlPoints.find(controlPoint => controlPoint.id === this.formGroup.value.controlPoint.id)
            // this.formGroup.value.controlPoint = this.controlPoint;
            // console.log(this.formGroup.value);
            // this.formGroup.patchValue(this.formGroup.value, { onlySelf: true });
        });
    }

    getShifts(): void {
        this.shiftService.getAll().then(shifts => {
            this.shifts = shifts;
            // const selectedShift = this.shifts.find(shift => shift.id === this.formGroup.value.shift.id)
            // this.formGroup.value.shift = selectedShift;
            // console.log(this.formGroup.value);
            // this.formGroup.patchValue(this.formGroup.value, { onlySelf: true });
        });
    }
    getShiftTypes(): void {
        this.shiftTypeService.getAll().then(shiftTypes => {
            this.shiftTypes = shiftTypes;
            // const selectedShiftType = this.shiftTypes.find(shiftType => shiftType.id === this.formGroup.value.shiftType.id)
            // this.formGroup.value.shiftType = selectedShiftType;
            // console.log(this.formGroup.value);
            // this.formGroup.patchValue(this.formGroup.value, { onlySelf: true });
        });
    }
    ngOnInit(): void {
        this.getControlPoints();
        this.getShifts();
        this.getShiftTypes();
    }

    /*================== Control Point Filter ===================*/
    filteredControlPoints: any[];
    controlPoint: any;

    filterControlPoints(event) {
        let query = event.query.toLowerCase();
        this.filteredControlPoints = [];
        for (let i = 0; i < this.controlPoints.length; i++) {
            let controlPoint = this.controlPoints[i];
            if (controlPoint.code.toLowerCase().indexOf(query) == 0 || controlPoint.name.toLowerCase().indexOf(query) == 0 ) {
                this.filteredControlPoints.push(controlPoint);
            }
        }
    }

    handleControlPointDropdownClick() {
        this.filteredControlPoints = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredControlPoints = this.controlPoints;
        }, 100)
    }

    onControlPointSelect(controlPoint: any) {
        console.log(event)
    }
    /*================== End Of Control Point Filter ===================*/
    
    /*================== Shift Filter ===================*/
    filteredShifts: any[];
    Shift: any;

    filterShifts(event) {
        let query = event.query.toLowerCase();
        this.filteredShifts = [];
        for (let i = 0; i < this.shifts.length; i++) {
            let Shift = this.shifts[i];
            if (Shift.code.toLowerCase().indexOf(query) == 0 || Shift.name.toLowerCase().indexOf(query) == 0 ) {
                this.filteredShifts.push(Shift);
            }
        }
    }

    handleShiftDropdownClick() {
        this.filteredShifts = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredShifts = this.shifts;
        }, 100)
    }

    onShiftSelect(Shift: any) {
        console.log(event)
    }
    /*================== End Of Shift Filter ===================*/

    
    /*================== Shift Type Filter ===================*/
    filteredShiftTypes: any[];
    shiftType: any;

    filterShiftTypes(event) {
        let query = event.query.toLowerCase();
        this.filteredShiftTypes = [];
        for (let i = 0; i < this.shiftTypes.length; i++) {
            let shiftType = this.shiftTypes[i];
            if (shiftType.code.toLowerCase().indexOf(query) == 0 || shiftType.name.toLowerCase().indexOf(query) == 0 ) {
                this.filteredShiftTypes.push(shiftType);
            }
        }
    }

    handleShiftTypeDropdownClick() {
        this.filteredShiftTypes = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredShiftTypes = this.shiftTypes;
        }, 100)
    }

    onShiftTypeSelect(shiftType: any) {
        console.log(event)
    }
    /*================== End Of Shift Type Filter ===================*/
}
