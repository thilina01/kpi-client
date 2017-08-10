import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';


import { ActivatedRoute, Params, Router } from '@angular/router'
import { SharedService } from "../../services/shared.service";
import { ProductionService } from "../production/production.service";

@Component({
  selector: 'plan',
  templateUrl: './plan.html'
})

export class Plan {
  public formGroup: FormGroup;
  public submitted: boolean = false;
  shift: any = { id: "", code: "", name: "" };
  controlPoint: any = { id: "", code: "", name: "" };

  constructor(fb: FormBuilder,
    private productionService: ProductionService,
    private sharedService: SharedService,
    private route: ActivatedRoute) {
    this.formGroup = fb.group({
      productionDate: ['', Validators.required],
      plannedDuration: ['', Validators.compose([Validators.required, CustomValidators.range([10, 1280])])],
      shift: [this.shift, Validators.required],
      shiftType: [{ id: "", code: "", name: "" }, Validators.required],
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
          this.productionService.getOne(+id).subscribe(
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
    }
    this.formGroup.patchValue(data, { onlySelf: true });
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

}
