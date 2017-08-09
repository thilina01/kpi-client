import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ManpowerTypeService } from "../../../manpowerType/manpowerType.service";


@Component({
  selector: 'plan-form-hr',
  templateUrl: './planFormHr.html',
  providers: [
    ManpowerTypeService
  ]
})
export class PlanFormHr {

  @Input('formGroup')
  public formGroup: FormGroup;
  public hrFormGroup: FormGroup;
  manpowerTypes: Array<Object>;

  constructor(
    fb: FormBuilder,
    private manpowerTypeService: ManpowerTypeService
  ) {
    this.hrFormGroup = fb.group({
      manpowerType: [{}, Validators.compose([Validators.required])],
      plannedQuantity: ['', Validators.compose([Validators.required,CustomValidators.range([1, 20])]
      )]
    });
  }

  getManpowerTypes(): void {
    this.manpowerTypeService.getAll().then(manpowerTypes => this.manpowerTypes = manpowerTypes);
  }

  ngOnInit(): void {
    this.getManpowerTypes();
  }

  public removeManpower(id: number) {
    if (this.formGroup.value.manpowerList != null) {
      this.formGroup.value.manpowerList.splice(id, 1);
    }
  }

  public onEnter(plannedQuantity: string) {
    if (this.hrFormGroup.valid) {
      let values = this.hrFormGroup.value;
      if (this.formGroup.value.manpowerList == null) {
        this.formGroup.value.manpowerList = [];
      }
      this.formGroup.value.manpowerList.push(values);
      this.hrFormGroup.reset();
      document.getElementById('manpowerTypeSelector').focus();
    } else {
      console.log(this.hrFormGroup.errors);
    }
  }
}

