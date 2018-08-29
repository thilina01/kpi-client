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
import { SubcontractNoteService } from '../../../subcontractNote/subcontractNote.service';

@Component({
  selector: 'subcontract-arrival-reject-reject-reject-reject-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./subcontractArrivalRejectForm.scss'],
  templateUrl: './subcontractArrivalRejectForm.html'
})
export class SubcontractArrivalRejectForm {
  public subcontractArrivalRejectFormGroup: FormGroup;
  arrivalRejectDate: Date = new Date();
  subcontractArrivalReject: any = {};
  subcontractArrivalRejectList = [];
  subcontractArrivalList: any;
  subscription: Subscription;
  subcontractNoteId: number;
  subcontractNoteList: any;
  subcontractArrival: any;
  subcontractNote: any;
  lossReasonList: any;
  JSON: any = JSON;
  lossReason: any;

  constructor(
    protected service: SubcontractArrivalRejectService,
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private lossReasonService: LossReasonService,
    private subcontractNoteService: SubcontractNoteService,
    private subcontractArrivalService: SubcontractArrivalService
  ) {
    this.subcontractArrivalRejectFormGroup = fb.group({
      id: '',
      quantity: ['', Validators.required],
      lossReason: [this.lossReason, Validators.required],
      subcontractNote: [this.subcontractNote, Validators.required],
      arrivalRejectDate: [this.arrivalRejectDate, Validators.required],
      subcontractArrival: [this.subcontractArrival, Validators.required]
    });
  }

  getSubcontractNoteList(): void {
    this.subcontractNoteService
      .getCombo()
      .subscribe(
        subcontractNoteList => (this.subcontractNoteList = subcontractNoteList)
      );
  }

  getSubcontractArrivalListBySubcontractNote(id: number): void {
    this.subcontractArrivalService
      .getBySubcontractNote(id)
      .subscribe(
        subcontractArrivalList =>
          (this.subcontractArrivalList = subcontractArrivalList)
      );
  }

  getLossReasonList(): void {
    this.lossReasonService
      .getCombo()
      .subscribe(lossReasonList => (this.lossReasonList = lossReasonList));
  }

  ngOnInit(): void {
    this.getLossReasonList();
    this.getSubcontractNoteList();
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      id = id === undefined ? '0' : id;
      if (id !== '0') {
        this.service
          .get(+id)
          .take(1)
          .subscribe(data => {});
      }
    });
  }

  public onEnter() {
    if (this.subcontractArrivalRejectFormGroup.valid) {
      let values = this.subcontractArrivalRejectFormGroup.value;
      if (this.subcontractArrivalRejectList == null) {
        this.subcontractArrivalRejectList = [];
      }
      values.arrivalRejectDate = this.arrivalRejectDate;
      this.subcontractArrivalRejectList.push(values);
      this.subcontractArrivalRejectFormGroup.reset();
      document.getElementById('subcontractNoteSelector').focus();
      this.subcontractArrivalRejectList = this.subcontractArrivalRejectList.slice();
    }
  }

  public save() {
    if (
      this.subcontractArrivalRejectList === null ||
      this.subcontractArrivalRejectList.length === 0
    ) {
      alert('Subcontract Arrival Reject Required');
      return;
    }
    this.service.saveMany(this.subcontractArrivalRejectList).subscribe(data => {
      this.sharedService.addMessage({
        severity: 'info',
        summary: 'Success',
        detail: 'Operation Success'
      });
      this.resetForm();
    });
  }

  refresh(): void {
    this.getLossReasonList();
    this.getSubcontractNoteList();
  }

  public resetForm() {
    this.subcontractArrivalRejectFormGroup.reset();
    this.subcontractArrivalRejectList = [];
    this.subcontractArrivalReject = null;
    this.subcontractArrivalRejectList = this.subcontractArrivalRejectList.slice();
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
  /*================== SubcontractNoteFilter ===================*/
  filteredSubcontractNoteList: any[];

  filterSubcontractNoteList(event) {
    let query = event.query.toLowerCase();
    this.filteredSubcontractNoteList = [];
    for (let i = 0; i < this.subcontractNoteList.length; i++) {
      let subcontractNote = this.subcontractNoteList[i];
      if (subcontractNote.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredSubcontractNoteList.push(subcontractNote);
      }
    }
  }
  onSubcontractNoteSelect(subcontractNoteCombo: any) {
    this.getSubcontractArrivalListBySubcontractNote(+subcontractNoteCombo.id);
  }
  /*================== SubcontractNoteFilter ===================*/
}
