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
      plannedQuantity: ['', Validators.compose([Validators.required, CustomValidators.range([1, 1000])])],
      startTime: [''],
      endTime: ['']
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
    this.formGroup.value.operationList = this.formGroup.value.operationList ? this.formGroup.value.operationList.slice() : [];
    this.dataTable.reset();
  }

  public removeOperationFromView(id: number) {
    this.formGroup.value.operationList.splice(id, 1);
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
              this.removeOperationFromView(id);
            }
            );
          }
        });
      } else {
        this.removeOperationFromView(id);
      }
    }
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

  /*================== Job Filter ===================*/
  filteredJobs: any[];
  job: any;

  filterJobs(event) {
    let query = event.query.toLowerCase();
    this.filteredJobs = [];
    for (let i = 0; i < this.jobs.length; i++) {
      let job = this.jobs[i];
      if (job.jobNo && (job.jobNo.toLowerCase().indexOf(query) == 0)) {
        this.filteredJobs.push(job);
      }
    }
  }

  handleJobDropdownClick() {
    this.filteredJobs = [];
    //mimic remote call
    setTimeout(() => {
      this.filteredJobs = this.jobs;
    }, 100)
  }

  onJobSelect(event: any) {
    let job = this.formGroup.value.job;
    if (job != null && job != undefined) {
      let display = job.jobNo != null && job.jobNo != undefined ? job.jobNo + ' : ' : '';
      this.formGroup.value.job.display = display;
    }
  }
  /*================== End Of Job Filter ===================*/


  /*================== Product Type Filter ===================*/
  filteredProductTypes: any[];
  productType: any;

  filterProductTypes(event) {
    let query = event.query.toLowerCase();
    this.filteredProductTypes = [];
    for (let i = 0; i < this.productTypes.length; i++) {
      let productType = this.productTypes[i];
      if (productType.code && (productType.code.toLowerCase().indexOf(query) == 0 || productType.description.toLowerCase().indexOf(query) == 0)) {
        this.filteredProductTypes.push(productType);
      }
    }
  }

  handleProductTypeDropdownClick() {
    this.filteredProductTypes = [];
    //mimic remote call
    setTimeout(() => {
      this.filteredProductTypes = this.productTypes;
    }, 100)
  }

  onProductTypeSelect(event: any) {
    let productType = this.formGroup.value.productType;
    if (productType != null && productType != undefined) {
      let display = productType.code != null && productType.code != undefined ? productType.code + ' : ' : '';
      display += productType.description != null && productType.description != undefined ? productType.description : '';
      this.formGroup.value.productType.display = display;
    }
  }
  /*================== End Of Product Type Filter ===================*/

  /*================== Operation Type Filter ===================*/
  filteredOperationTypes: any[];
  operationType: any;

  filterOperationTypes(event) {
    let query = event.query.toLowerCase();
    this.filteredOperationTypes = [];
    for (let i = 0; i < this.operationTypes.length; i++) {
      let operationType = this.operationTypes[i];
      if (operationType.code && (operationType.code.toLowerCase().indexOf(query) == 0 || operationType.description.toLowerCase().indexOf(query) == 0)) {
        this.filteredOperationTypes.push(operationType);
      }
    }
  }

  handleOperationTypeDropdownClick() {
    this.filteredOperationTypes = [];
    //mimic remote call
    setTimeout(() => {
      this.filteredOperationTypes = this.operationTypes;
    }, 100)
  }

  onOperationTypeSelect(event: any) {
    let operationType = this.formGroup.value.operationType;
    if (operationType != null && operationType != undefined) {
      let display = operationType.code != null && operationType.code != undefined ? operationType.code + ' : ' : '';
      display += operationType.description != null && operationType.description != undefined ? operationType.description : '';
      this.formGroup.value.operationType.display = display;
    }
  }
  /*================== End Of Operation Type Filter ===================*/
}
