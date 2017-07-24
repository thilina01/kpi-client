import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { JobService } from '../../../../services/job.service';
import { ProductTypeService } from '../../../../services/productType.service';
import { OperationTypeService } from '../../../../services/operationType.service';

@Component({
  selector: 'plan-form-job',
  templateUrl: './planFormJob.html',
  providers: [
    JobService,
    ProductTypeService,
    OperationTypeService
  ]
})
export class PlanFormJob {

  @Input('formGroup')
  public formGroup: FormGroup;
  public jobFormGroup: FormGroup;
  jobs: Array<any>;
  productTypes: Array<any>;
  operationTypes: Array<any>;

  constructor(
    fb: FormBuilder,
    private jobService: JobService,
    private productTypeService: ProductTypeService,
    private operationTypeService: OperationTypeService
  ) {
    this.jobFormGroup = fb.group({
      job: [{}, Validators.compose([Validators.required])],
      productType: [{}, Validators.compose([Validators.required])],
      operationType: [{}, Validators.compose([Validators.required])],
      plannedQuantity: ['', Validators.compose([Validators.required, , CustomValidators.range([1, 1000])]
      )]
    });
  }

  refresh(): void {    
    this.getJobs();
    this.getProductTypes();
    this.getOperationTypes();
  }

  getJobs(): void {
    this.jobService.getAll().then(jobs => this.jobs = jobs);
  }

  getProductTypes(): void {
    this.productTypeService.getAll().then(productTypes => this.productTypes = productTypes);
  }

  getOperationTypes(): void {
    this.operationTypeService.getAll().then(operationTypes => this.operationTypes = operationTypes);
  }

  ngOnInit(): void {
    this.refresh();
  }

  public removeOperation(id: number) {
    if (this.formGroup.value.operationList != null) {
      this.formGroup.value.operationList.splice(id, 1);
    }
  }

  public onEnter(plannedQuantity: string) {
    if (this.jobFormGroup.valid) {
      let values = this.jobFormGroup.value;
      if (this.formGroup.value.operationList == null) {
        this.formGroup.value.operationList = [];
      }

      this.formGroup.value.operationList.push(values);
      this.jobFormGroup.reset();
      document.getElementById('jobSelector').focus();

    } else {
      console.log(this.jobFormGroup.errors);
    }
  }
}
