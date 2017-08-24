import { Component, Input, ViewChild, SimpleChanges } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';


import { DataTable } from "primeng/primeng";
import { JobService } from "../../../job/job.service";
import { OperationTypeService } from "../../../operationType/operationType.service";
import { ProductTypeService } from "../../../productType/productType.service";

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
  // operations = new Array;
  jobs: Array<any>;
  productTypes: Array<any>;
  operationTypes: Array<any>;
  totalRecords = 0;

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

  ngOnInit(): void {
    setTimeout(() => {
      this.refresh();
    }, 500);
  }

  // ngDoCheck(): void {
  //   this.refresh();
  // }
  // ngOnChanges(changes: SimpleChanges) {
  //   for (let propName in changes) {
  //     let chng = changes[propName];
  //     console.log(chng);
  //     alert(chng + "")
  //     // let cur  = JSON.stringify(chng.currentValue);
  //     // let prev = JSON.stringify(chng.previousValue);
  //     // this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
  //   }
  // }
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
    // this.operations = this.formGroup.value.operationList.slice();
    //this.totalRecords = this.operations.length;    
    this.formGroup.value.operationList = this.formGroup.value.operationList.slice();
    this.dataTable.reset();
  }

  public removeOperation(id: number) {
    if (this.formGroup.value.operationList != null) {
      this.formGroup.value.operationList.splice(id, 1);
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
      //this.dataTable.reset();
    } else {
      console.log(this.jobFormGroup.errors);
    }
    //this.fillOperations();
    //dt.reset();
  }
}
