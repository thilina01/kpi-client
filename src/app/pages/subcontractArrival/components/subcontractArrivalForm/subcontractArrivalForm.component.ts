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
import { SubcontractArrivalService } from '../../subcontractArrival.service';
import 'rxjs/add/operator/take';
import { SubcontractOperationService } from '../../../../services/subcontractOperation.service';
import { SubcontractNoteService } from '../../../subcontractNote/subcontractNote.service';

@Component({
  selector: 'subcontract-arrival-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./subcontractArrivalForm.scss'],
  templateUrl: './subcontractArrivalForm.html'
})
export class SubcontractArrivalForm {
  quantity = 0.0;
  JSON: any = JSON;
  subcontractNote: any;
  subcontractNoteList: any;
  subcontractOperation: any;
  subscription: Subscription;
  public formGroup: FormGroup;
  subcontractArrivalList = [];
  subcontractArrival: any = {};
  subcontractOperationList = [];
  arrivalTime: Date = new Date();

  constructor(
    protected service: SubcontractArrivalService,
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private subcontractNoteService: SubcontractNoteService,
    private subcontractOperationService: SubcontractOperationService
  ) {}

  getSubcontractNoteList(): void {
    this.subcontractNoteService
      .getCombo()
      .subscribe(
        subcontractNoteList => (this.subcontractNoteList = subcontractNoteList)
      );
  }

  getSubcontractOperationListBySubcontractNote(id: number): void {
    this.subcontractOperationService
      .getBySubcontractNote(id)
      .subscribe(subcontractOperationList => {
        this.fillSubcontractArrivalList(subcontractOperationList);
      });
  }

  ngOnInit(): void {
    this.getSubcontractNoteList();
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
      this.subcontractArrival = data;
    }
    this.formGroup.patchValue(this.subcontractArrival, { onlySelf: true });
  }

  fillSubcontractArrivalList(subcontractOperationList: any[]) {
    this.subcontractArrivalList = [];
    for (let i = 0; i < subcontractOperationList.length; i++) {
      let subcontractOperation = subcontractOperationList[i];
      let xSubcontractArrivalList = subcontractOperation.subcontractArrivalList;
      let totalReceivedQuantity = 0;
      for (let ii = 0; ii < xSubcontractArrivalList.length; ii++) {
        let xSubcontractArrival = xSubcontractArrivalList[ii];

        totalReceivedQuantity += xSubcontractArrival.quantity;
      }

      let newSubcontractArrival = {
        arrivalTime: this.arrivalTime,
        quantity: 0,
        totalReceivedQuantity: totalReceivedQuantity,
        subcontractOperation: subcontractOperation
      };

      this.subcontractArrivalList.push(newSubcontractArrival);
      this.subcontractArrivalList = this.subcontractArrivalList.slice();
    }
  }

  public save(): void {
    let subcontractArrivalToSave = [];
    let xSubcontractArrival;
    for (let i = 0; i < this.subcontractArrivalList.length; i++) {
      xSubcontractArrival = this.subcontractArrivalList[i];
      if (xSubcontractArrival.quantity > 0) {
        if (
          xSubcontractArrival.quantity >
          xSubcontractArrival.subcontractOperation.quantity
        ) {
          alert('Added incorrect Received Quantity Please Check');
          return;
        }
        subcontractArrivalToSave.push(xSubcontractArrival);
      }
    }

    this.service.saveMany(subcontractArrivalToSave).subscribe(data => {
      this.sharedService.addMessage({
        severity: 'info',
        summary: 'Success',
        detail: 'Operation Success'
      });
      this.reset();
    });
  }

  refresh(): void {
    this.getSubcontractNoteList();
  }

  reset() {
    this.resetForm();
  }

  public resetForm() {
    this.quantity = 0.0;
    this.subcontractNote = null;
    this.subcontractArrivalList = [];
    this.subcontractArrivalList = this.subcontractArrivalList.slice();
  }

  /*================== SubcontractOperationFilter ===================*/
  filteredSubcontractOperationList: any[];

  filterSubcontractOperationList(event) {
    let query = event.query.toLowerCase();
    this.filteredSubcontractOperationList = [];
    for (let i = 0; i < this.subcontractOperationList.length; i++) {
      let subcontractOperation = this.subcontractOperationList[i];
      if (subcontractOperation.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredSubcontractOperationList.push(subcontractOperation);
      }
    }
  }
  onSubcontractOperationSelect(event: any) {}
  /*================== SubcontractOperationFilter ===================*/
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
    this.getSubcontractOperationListBySubcontractNote(+subcontractNoteCombo.id);
  }
  /*================== SubcontractNoteFilter ===================*/
}
