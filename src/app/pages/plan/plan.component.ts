import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { ProductionService } from '../../services/production.service';

@Component({
  selector: 'plan',
  templateUrl: './plan.html',
  providers: [
    ProductionService
  ]
})

export class Plan {
  public formGroup: FormGroup;
  public submitted: boolean = false;

  constructor(fb: FormBuilder, private productionService: ProductionService) {
    this.formGroup = fb.group({
      productionDate: ['', Validators.required],
      plannedDuration: ['', Validators.compose([Validators.required, CustomValidators.range([10, 1280])])],
      shift: [null, Validators.required],
      shiftType: [null, Validators.required],
      controlPoint: [null, Validators.compose([Validators.required])],
      operationList: [[]],
      manpowerList: [[]]
    });
  }

  public onSubmit(values: any): void {
    this.submitted = true;
    if (this.formGroup.valid) {
      if (values.operationList.length === 0) {
        alert('Jobs Required');
        return;
      }
      if (values.manpowerList.length === 0) {
        alert('Manpower Required');
        return;
      }
      console.log(values);
      this.productionService.save(values);
      this.resetForm();
    }
  }

  public resetForm() {
    this.formGroup.reset();
  }

}
