import { Component, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { OperationService } from '../../../operation/operation.service';
import 'rxjs/add/operator/take';
import { OperationProgressService } from '../../operationProgress.service';

@Component({
  selector: 'operation-progress-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./operationProgressForm.scss'],
  templateUrl: './operationProgressForm.html',
})
export class OperationProgressForm {
  operationProgressFormGroup: FormGroup;
  subscription: Subscription;
  operation: any;
  operationId: number;
  timeSlots = [
    { code: '10:00' },
    { code: '13:00' },
    { code: '16:00' },
    { code: '19:00' },
    { code: '22:00' },
    { code: '01:00' },
    { code: '04:00' },
    { code: '07:00' }
  ];

  constructor(
    private service: OperationProgressService,
    private operationService: OperationService,
    private route: ActivatedRoute,
    fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService) {
    this.operationProgressFormGroup = fb.group({
      quantity: [undefined, Validators.required],
      timeSlot: [undefined, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        if (id !== undefined && id !== '0') {
          this.operationId = +id;
          this.loadData();
        }
      }
    );
  }

  fill(): void {
    this.clear();
    this.loadData();
  }

  clear(): void {
    this.operation = undefined;
  }

  loadData() {
    if (this.operationId === undefined || this.operationId === 0) { return; }
    this.operationService.get(this.operationId).take(1).subscribe(
      (data) => {
        if (data != null) {
          this.operation = data;
        }
      }
    );
  }

  public onEnter() {
    if (this.operation === undefined || this.operation.id === undefined) {
      alert('Operation required!');
      return;
    }
    if (this.operationProgressFormGroup.valid) {
      let values = this.operationProgressFormGroup.value;
      if (this.operation.operationProgressList == null) {
        this.operation.operationProgressList = [];
      }
      let productionDate = this.operation.production.productionDate;
      let operationProgress = {
        operation: { id: this.operation.id },
        quantity: values.quantity,
        timeSlot: new Date(productionDate + ' ' + values.timeSlot.code + ':00')

      };
      this.operation.operationProgressList.push(operationProgress);
      this.operationProgressFormGroup.reset();
      document.getElementById('timeSlotSelector').focus();
      this.operation.operationProgressList = this.operation.operationProgressList.slice();
    }
    else {
      console.log(this.operationProgressFormGroup.errors);
    }
  }

  public removeOperationProgress(id: number) {
    if (this.operation.operationProgressList != null) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to Delete?',
        accept: () => {
          this.operation.operationProgressList.splice(id, 1);
          this.operation.operationProgressList = this.operation.operationProgressList.slice();
        }
      });
    }
  }

  public save() {
    this.service.saveMany(this.operation.operationProgressList).subscribe(
      (data) => {
        this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
        this.reset();
      }
    );
  }

  public reset() {
    this.operationId = undefined;
    this.fill();
    this.operationProgressFormGroup.reset();
  }
}

