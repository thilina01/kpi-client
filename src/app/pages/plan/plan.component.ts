import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { ActivatedRoute, Params, Router } from '@angular/router'
import { SharedService } from '../../services/shared.service';
import { ProductionService } from '../production/production.service';

@Component({
  selector: 'plan',
  templateUrl: './plan.html'
})

export class Plan {

  shiftList = [];
  shiftTypeList = [];
  controlPointList = [];

  public formGroup: FormGroup;
  public submitted: boolean = false;
  shift: any = { id: '', code: '', name: '' };
  controlPoint: any = { id: '', code: '', name: '' };

  constructor(fb: FormBuilder,
    private productionService: ProductionService,
    private sharedService: SharedService,
    private route: ActivatedRoute) {
    this.formGroup = fb.group({
      id: '',
      productionDate: ['', Validators.required],
      plannedDuration: ['', Validators.compose([Validators.required, CustomValidators.range([10, 1280])])],
      shift: [this.shift, Validators.required],
      shiftType: [{ id: '', code: '', name: '' }, Validators.required],
      controlPoint: [this.controlPoint, Validators.compose([Validators.required])],
      operationList: [[]],
      manpowerList: [[]]
    });
  }

  ngOnInit(): void {
    this.formGroup.reset();
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        console.log(params);
        id = id == undefined ? '0' : id;
        if (id != '0') {
          this.productionService.get(+id).subscribe(
            (data) => {
              this.loadForm(data);
              console.log(data);
            }
          )
        }
      }
    );
  }

  loadForm(data: any) {
    if (data != null) {
      data.productionDate = new Date(data.productionDate);
      data.operationList.forEach(element => {

        delete element.lossList;
      });
    }
    this.formGroup.patchValue(data, { onlySelf: true });
    this.setDisplayOfShiftType();
    this.setDisplayOfShift();
    this.setDisplayOfControlPoint();
  }

  public onSubmit(values: any): void {
    this.submitted = true;
    if (this.formGroup.valid) {
      if (values.controlPoint.id === undefined) {
        alert('Please Select Control Point');
        return;
      }
      if (values.shift.id === undefined) {
        alert('Please Select Shift');
        return;
      }
      if (values.shiftType.id === undefined) {
        alert('Please Select Shift Type');
        return;
      }
      if (values.operationList === null || values.operationList.length === 0) {
        alert('Jobs Required');
        return;
      }
      if (values.manpowerList === null || values.manpowerList.length === 0) {
        alert('Manpower Required');
        return;
      }
      console.log(values);
      this.productionService.save(values).subscribe(
        (data) => {
          this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Plan Added' });
          this.resetForm();
        }
      );
    }
  }

  public resetForm() {
    this.formGroup.reset();
  }


  /*================== ShiftFilter ===================*/
  filteredShiftList: any[];

  filterShiftList(event) {
    let query = event.query.toLowerCase();
    this.filteredShiftList = [];
    for (let i = 0; i < this.shiftList.length; i++) {
      let shift = this.shiftList[i];
      if (shift.code.toLowerCase().indexOf(query) == 0 || shift.name.toLowerCase().indexOf(query) == 0) {
        this.filteredShiftList.push(shift);
      }
    }
  }

  handleShiftDropdownClick() {
    this.filteredShiftList = [];
    //mimic remote call
    setTimeout(() => {
      this.filteredShiftList = this.shiftList;
    }, 100)
  }

  onShiftSelect(event: any) {
    this.setDisplayOfShift();
  }

  setDisplayOfShift() {
    let shift = this.formGroup.value.shift;
    if (shift != null && shift != undefined) {
      let display = shift.code != null && shift.code != undefined ? shift.code + ' : ' : '';
      display += shift.name != null && shift.name != undefined ? shift.name : '';
      this.formGroup.value.shift.display = display;
    }
  }

  /*================== ShiftTypeFilter ===================*/
  filteredShiftTypeList: any[];

  filterShiftTypeList(event) {
    let query = event.query.toLowerCase();
    this.filteredShiftTypeList = [];
    for (let i = 0; i < this.shiftTypeList.length; i++) {
      let shiftType = this.shiftTypeList[i];
      if (shiftType.code.toLowerCase().indexOf(query) == 0 || shiftType.name.toLowerCase().indexOf(query) == 0) {
        this.filteredShiftTypeList.push(shiftType);
      }
    }
  }

  handleShiftTypeDropdownClick() {
    this.filteredShiftTypeList = [];
    //mimic remote call
    setTimeout(() => {
      this.filteredShiftTypeList = this.shiftTypeList;
    }, 100)
  }

  onShiftTypeSelect(event: any) {
    this.setDisplayOfShiftType();
  }

  setDisplayOfShiftType() {
    let shiftType = this.formGroup.value.shiftType;
    if (shiftType != null && shiftType != undefined) {
      let display = shiftType.code != null && shiftType.code != undefined ? shiftType.code + ' : ' : '';
      display += shiftType.name != null && shiftType.name != undefined ? shiftType.name : '';
      this.formGroup.value.shiftType.display = display;
    }
  }

  /*================== ControlPointFilter ===================*/
  filteredControlPointList: any[];

  filterControlPointList(event) {
    let query = event.query.toLowerCase();
    this.filteredControlPointList = [];
    for (let i = 0; i < this.controlPointList.length; i++) {
      let controlPoint = this.controlPointList[i];
      if (controlPoint.code.toLowerCase().indexOf(query) == 0 || controlPoint.name.toLowerCase().indexOf(query) == 0) {
        this.filteredControlPointList.push(controlPoint);
      }
    }
  }

  handleControlPointDropdownClick() {
    this.filteredControlPointList = [];
    //mimic remote call
    setTimeout(() => {
      this.filteredControlPointList = this.controlPointList;
    }, 100)
  }

  onControlPointSelect(event: any) {
    this.setDisplayOfControlPoint();
  }

  setDisplayOfControlPoint() {
    let controlPoint = this.formGroup.value.controlPoint;
    if (controlPoint != null && controlPoint != undefined) {
      let display = controlPoint.code != null && controlPoint.code != undefined ? controlPoint.code + ' : ' : '';
      display += controlPoint.name != null && controlPoint.name != undefined ? controlPoint.name : '';
      this.formGroup.value.controlPoint.display = display;
    }
  }
}
