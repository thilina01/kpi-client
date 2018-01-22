import { Component, Input, ViewChild, SimpleChanges } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { DataTable, ConfirmationService } from 'primeng/primeng';
import { JobService } from '../../../job/job.service';
import { OperationTypeService } from '../../../operationType/operationType.service';
import { ProductTypeService } from '../../../productType/productType.service';
import { OperationService } from '../../../operation/operation.service';
import { SharedService } from '../../../../services/shared.service';

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
  @ViewChild(DataTable) dataTable: DataTable;
  public jobFormGroup: FormGroup;
  jobs: Array<any>;
  productTypes: Array<any>;
  operationTypes: Array<any>;
  totalRecords = 0;

  constructor(
    fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService,
    private jobService: JobService,
    private productTypeService: ProductTypeService,
    private operationService: OperationService,
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

  ngOnInit(): void {
    setTimeout(() => {
      this.refresh();
    }, 500);
  }

  refresh(): void {
    this.getJobs();
    this.getProductTypes();
    this.getOperationTypes();
    this.fillOperations();
  }

  getJobs(): void {
    this.jobService.getAll().subscribe(jobs => this.jobs = jobs);
  }

  getProductTypes(): void {
    this.productTypeService.getAll().subscribe(productTypes => this.productTypes = productTypes);
  }

  getOperationTypes(): void {
    this.operationTypeService.getAll().subscribe(operationTypes => this.operationTypes = operationTypes);
  }

  fillOperations(): void {

    this.formGroup.value.operationList = this.formGroup.value.operationList.slice();
    this.dataTable.reset();
  }

  public removeOperation(id: number) {
    if (this.formGroup.value.operationList != null) {
      let operationToDelete = this.formGroup.value.operationList[id];
      if (operationToDelete.id !== undefined) {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to Delete this from server?',
          accept: () => {
            this.operationService.delete(operationToDelete.id).subscribe(response => {
              this.sharedService.addMessage({ severity: 'info', summary: 'Deleted', detail: 'Delete success' });
              this.formGroup.value.operationList.splice(id, 1);
            }
            );
          }
        });
      } else {
        this.formGroup.value.operationList.splice(id, 1);
      }
    }
    this.fillOperations();
  }

  public onEnter(plannedQuantity: string, dt: DataTable) {
    if (this.jobFormGroup.valid) {
      let values = this.jobFormGroup.value;
      if (this.formGroup.value.operationList == null) {
        this.formGroup.value.operationList = [];
      }

      this.formGroup.value.operationList.push(values);
      this.jobFormGroup.reset();
      document.getElementById('jobSelector').focus();
      console.log(this.formGroup.value.operationList);
      this.formGroup.value.operationList = this.formGroup.value.operationList.slice();
    } else {
      console.log(this.jobFormGroup.errors);
    }

  }
}
