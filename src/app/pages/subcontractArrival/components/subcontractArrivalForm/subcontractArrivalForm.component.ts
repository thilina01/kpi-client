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
  JSON: any = JSON;
  subcontractOperation: any;
  subscription: Subscription;
  public formGroup: FormGroup;
  subcontractArrival: any = {};
  subcontractOperationList: any;
  arrivalTime: Date = new Date();
  subcontractNote: any;
  subcontractNoteList: any;

  constructor(
    protected service: SubcontractArrivalService,
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private subcontractNoteService: SubcontractNoteService,
    private subcontractOperationService: SubcontractOperationService
  ) {
    this.formGroup = fb.group({
      id: '',
      quantity: ['', Validators.required],
      arrivalTime: [this.arrivalTime, Validators.required],
      subcontractNote: [],
      subcontractOperation: [this.subcontractOperation, Validators.required]
    });
  }

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
      .subscribe(
        subcontractOperationList =>
          (this.subcontractOperationList = subcontractOperationList)
      );
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
      this.router.navigate(['/pages/subcontractArrival/form/']);
    });
  }

  refresh(): void {
    this.getSubcontractNoteList();
  }

  public resetForm() {
    this.formGroup.reset();
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
