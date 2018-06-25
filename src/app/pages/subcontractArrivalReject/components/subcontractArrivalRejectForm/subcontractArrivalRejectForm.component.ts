import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators
} from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { SubcontractArrivalRejectService } from '../../subcontractArrivalReject.service';
import 'rxjs/add/operator/take';
import { LossReasonService } from '../../../lossReason/lossReason.service';
import { SubcontractArrivalService } from '../../../subcontractArrival/subcontractArrival.service';

@Component({
  selector: 'subcontract-arrival-reject-reject-reject-reject-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./subcontractArrivalRejectForm.scss'],
  templateUrl: './subcontractArrivalRejectForm.html'
})
export class SubcontractArrivalRejectForm {
  JSON: any = JSON;
  subscription: Subscription;
  public formGroup: FormGroup;
  subcontractArrivalReject: any = {};
  lossReason: any;
  subcontractArrival: any;
  lossReasonList: any;
  subcontractArrivalList: any;

  constructor(
    protected service: SubcontractArrivalRejectService,
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private lossReasonService: LossReasonService,
    private subcontractArrivalService: SubcontractArrivalService
  ) {
    this.formGroup = fb.group({
      id: '',
      quantity: ['', Validators.required],
      lossReason: [this.lossReason, Validators.required],
      subcontractArrival: [this.subcontractArrival, Validators.required]
    });
  }

  getLossReasonList(): void {
    this.lossReasonService
      .getCombo()
      .subscribe(lossReasonList => (this.lossReasonList = lossReasonList));
  }

  getSubcontractArrivalList(): void {
    this.subcontractArrivalService
      .getCombo()
      .subscribe(
        subcontractArrivalList =>
          (this.subcontractArrivalList = subcontractArrivalList)
      );
  }

  ngOnInit(): void {
    this.getLossReasonList();
    this.getSubcontractArrivalList();
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      id = id === undefined ? '0' : id;
      if (id !== '0') {
        this.service
          .get(+id)
          .take(1)
          .subscribe(data => {
            this.loadForm(data);
          });
      }
    });
  }

  loadForm(data: any) {
    if (data != null) {
      data.arrivalTime = new Date(data.arrivalTime);
      this.subcontractArrivalReject = data;
    }
    this.formGroup.patchValue(this.subcontractArrivalReject, {
      onlySelf: true
    });
  }

  public onSubmit(values: any, event: Event): void {
    event.preventDefault();
    console.log(values);
    this.service.save(values).subscribe(data => {
      this.sharedService.addMessage({
        severity: 'info',
        summary: 'Success',
        detail: 'Operation Success'
      });
      this.resetForm();
      this.router.navigate(['/pages/subcontractArrivalReject/form/']);
    });
  }

  refresh(): void {
    this.getLossReasonList();
    this.getSubcontractArrivalList();
  }

  public resetForm() {
    this.formGroup.reset();
  }

  /*================== SubcontractArrivalFilter ===================*/
  filteredSubcontractArrivalList: any[];

  filterSubcontractArrivalList(event) {
    let query = event.query.toLowerCase();
    this.filteredSubcontractArrivalList = [];
    for (let i = 0; i < this.subcontractArrivalList.length; i++) {
      let subcontractArrival = this.subcontractArrivalList[i];
      if (subcontractArrival.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredSubcontractArrivalList.push(subcontractArrival);
      }
    }
  }
  onSubcontractArrivalSelect(event: any) {}
  /*================== SubcontractArrivalFilter ===================*/
  /*================== LossReasonFilter ===================*/
  filteredLossReasonList: any[];

  filterLossReasonList(event) {
    let query = event.query.toLowerCase();
    this.filteredLossReasonList = [];
    for (let i = 0; i < this.lossReasonList.length; i++) {
      let lossReason = this.lossReasonList[i];
      if (lossReason.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredLossReasonList.push(lossReason);
      }
    }
  }
  onLossReasonSelect(event: any) {}
  /*================== LossReasonFilter ===================*/
}
