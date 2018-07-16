import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators
} from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { SubcontractOperationRateService } from '../../subcontractOperationRate.service';
import 'rxjs/add/operator/take';
import { SubcontractorOperationService } from '../../../subcontractorOperation/subcontractorOperation.service';
import { SubcontractorService } from '../../../subcontractor/subcontractor.service';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'subcontract-operation-rate-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./subcontractOperationRateForm.scss'],
  templateUrl: './subcontractOperationRateForm.html'
})
export class SubcontractOperationRateForm {
  @ViewChild(DataTable) dataTable: DataTable;
  subcontractOperationRateList = [];
  dateOfRate: Date = new Date();
  subscription: Subscription;
  subcontractorList = [];
  subcontractor: any;
  JSON: any = JSON;
  rate = 0.0;

  constructor(
    protected service: SubcontractOperationRateService,
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private subcontractorService: SubcontractorService,
    private subcontractorOperationService: SubcontractorOperationService
  ) {}

  getSubcontractorList(): void {
    this.subcontractorService
      .getCombo()
      .subscribe(
        subcontractorList => (this.subcontractorList = subcontractorList)
      );
  }

  getSubcontractorOperationListBySubcontractor(id: number): void {
    this.subcontractorOperationService
      .getBySubcontractor(id)
      .subscribe(subcontractorOperationList => {
        this.fillSubcontractOperationRateList(subcontractorOperationList);
      });
  }

  fillSubcontractOperationRateList(subcontractorOperationList: any[]) {
    this.subcontractOperationRateList = [];
    for (let i = 0; i < subcontractorOperationList.length; i++) {
      let subcontractorOperation = subcontractorOperationList[i];
      this.service
        .getLatestBySubcontractorOperation(subcontractorOperation.id)
        .subscribe(existingSubcontractOperationRate => {
          let newSubcontractOperationRate = {
            dateOfRate: this.dateOfRate,
            rate: 0,
            subcontractorOperation: subcontractorOperation
          };

          if (existingSubcontractOperationRate) {
            newSubcontractOperationRate.rate =
              existingSubcontractOperationRate.rate;
          }

          this.subcontractOperationRateList.push(newSubcontractOperationRate);
          this.subcontractOperationRateList = this.subcontractOperationRateList.slice();
        });
    }
  }

  ngOnInit(): void {
    this.getSubcontractorList();
  }

  reset() {
    this.resetForm();
  }

  refresh(): void {
    this.getSubcontractorList();
  }

  public save(): void {
    let subcontractOperationRateToSave = [];
    for (let i = 0; i < this.subcontractOperationRateList.length; i++) {
      let subcontractOperationRate = this.subcontractOperationRateList[i];
      if (subcontractOperationRate.rate > 0) {
        subcontractOperationRateToSave.push(subcontractOperationRate);
        this.service
          .saveMany(subcontractOperationRateToSave)
          .subscribe(data => {
            this.sharedService.addMessage({
              severity: 'info',
              summary: 'Success',
              detail: 'Operation Success'
            });
            this.reset();
          });
      }
    }
  }

  public resetForm() {
    this.rate = 0.0;
    this.subcontractor = null;
    this.subcontractOperationRateList = [];
    this.subcontractOperationRateList = this.subcontractOperationRateList.slice();
  }

  /*================== SubcontractorFilter ===================*/
  filteredSubcontractorList: any[];

  filterSubcontractorList(event) {
    let query = event.query.toLowerCase();
    this.filteredSubcontractorList = [];
    for (let i = 0; i < this.subcontractorList.length; i++) {
      let subcontractor = this.subcontractorList[i];
      if (subcontractor.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredSubcontractorList.push(subcontractor);
      }
    }
  }
  onSubcontractorSelect(subcontractorCombo: any) {
    this.getSubcontractorOperationListBySubcontractor(+subcontractorCombo.id);
  }
  /*================== SubcontractorFilter ===================*/
}
