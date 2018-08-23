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
import { SubcontractNoteService } from '../../subcontractNote.service';
import 'rxjs/add/operator/take';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { SubcontractorService } from '../../../subcontractor/subcontractor.service';
import { JobService } from '../../../job/job.service';
import { SubcontractOperationRateService } from '../../../subcontractOperationRate/subcontractOperationRate.service';
import { SubcontractArrivalRejectService } from '../../../subcontractArrivalReject/subcontractArrivalReject.service';
import { SubcontractReworkNoteService } from '../../../../services/subcontractReworkNote.service';

@Component({
  selector: 'subcontract-note-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./subcontractNoteForm.scss'],
  templateUrl: './subcontractNoteForm.html'
})
export class SubcontractNoteForm {
  @Input('formGroup')
  public formGroup: FormGroup;
  @ViewChild(DataTable)
  dataTable: DataTable;
  subcontractOperationFormGroup: FormGroup;
  subcontractReworkOperationFormGroup: FormGroup;
  subcontractOperationRateList: any;
  subcontractOperationRate: any;
  subcontractOperationList = [];
  subcontractReworkOperationList = [];
  noteTime: Date = new Date();
  subscription: Subscription;
  subcontractNote: any = {};
  subcontractorList: any;
  subcontractor: any;
  JSON: any = JSON;
  jobList: any;
  job: any;
  subcontractArrivalRejectList: any;
  subcontractArrivalReject: any;

  constructor(
    protected service: SubcontractNoteService,
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private jobService: JobService,
    private sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private subcontractorService: SubcontractorService,
    private subcontractOperationRateService: SubcontractOperationRateService,
    private subcontractArrivalRejectService: SubcontractArrivalRejectService,
    private subcontractReworkNoteService: SubcontractReworkNoteService
  ) {
    this.formGroup = fb.group({
      id: '',
      noteTime: [this.noteTime, Validators.required],
      subcontractor: [this.subcontractor, Validators.required],
      subcontractOperationList: [[]],
      subcontractReworkOperationList: [[]]
    });
    this.subcontractOperationFormGroup = fb.group({
      quantity: ['', Validators.required],
      job: [this.job, Validators.required],
      subcontractOperationRate: [
        this.subcontractOperationRate,
        Validators.required
      ]
    });
    this.subcontractReworkOperationFormGroup = fb.group({
      quantity: ['', Validators.required],
      subcontractArrivalReject: [
        this.subcontractArrivalReject,
        Validators.required
      ]
    });
  }

  getSubcontractorList(): void {
    this.subcontractorService
      .getCombo()
      .subscribe(
        subcontractorList => (this.subcontractorList = subcontractorList)
      );
  }

  getSubcontractOperationRateListBySubcontractor(id: number): void {
    this.subcontractOperationRateService
      .getBySubcontractor(id)
      .subscribe(
        subcontractOperationRateList =>
          (this.subcontractOperationRateList = subcontractOperationRateList)
      );
  }

  getSubcontractArrivalRejectListBySubcontractor(id: number): void {
    this.subcontractArrivalRejectService
      .getBySubcontractor(id)
      .subscribe(
        subcontractArrivalRejectList =>
          (this.subcontractArrivalRejectList = subcontractArrivalRejectList)
      );
  }

  ngOnInit(): void {
    this.getSubcontractorList();
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
      data.noteTime = new Date(data.noteTime);
      this.subcontractNote = data;
    }
    this.formGroup.patchValue(this.subcontractNote, { onlySelf: true });
  }

  public onEnterSubcontractOperation() {
    if (this.subcontractOperationFormGroup.valid) {
      let values = this.subcontractOperationFormGroup.value;
      if (this.formGroup.value.subcontractOperationList == null) {
        this.formGroup.value.subcontractOperationList = [];
      }
      this.formGroup.value.subcontractOperationList.push(values);
      this.subcontractOperationFormGroup.reset();
      document.getElementById('jobSelector').focus();
      this.formGroup.value.subcontractOperationList = this.formGroup.value.subcontractOperationList.slice();
    }
  }

  public removeSubcontractOperation(id: number) {
    if (this.formGroup.value.subcontractOperationList != null) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to Delete?',
        accept: () => {
          this.formGroup.value.subcontractOperationList.splice(id, 1);
          this.fillSubcontractOperation();
        }
      });
    }
  }

  fillSubcontractOperation(): void {
    this.formGroup.value.subcontractOperationList = this.formGroup.value.subcontractOperationList.slice();
    this.dataTable.reset();
  }

  public onEnterSubcontractReworkOperation() {
    if (this.subcontractReworkOperationFormGroup.valid) {
      let values = this.subcontractReworkOperationFormGroup.value;
      if (this.formGroup.value.subcontractReworkOperationList == null) {
        this.formGroup.value.subcontractReworkOperationList = [];
      }
      this.formGroup.value.subcontractReworkOperationList.push(values);
      this.subcontractReworkOperationFormGroup.reset();
      document.getElementById('subcontractArrivalRejectSelector').focus();
      this.formGroup.value.subcontractReworkOperationList = this.formGroup.value.subcontractReworkOperationList.slice();
    }
  }

  public removeSubcontractReworkOperation(id: number) {
    if (this.formGroup.value.subcontractReworkOperationList != null) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to Delete?',
        accept: () => {
          this.formGroup.value.subcontractReworkOperationList.splice(id, 1);
          this.fillSubcontractReworkOperation();
        }
      });
    }
  }

  fillSubcontractReworkOperation(): void {
    this.formGroup.value.subcontractReworkOperationList = this.formGroup.value.subcontractReworkOperationList.slice();
    this.dataTable.reset();
  }


  public onSubmit(values: any, event: Event): void {
    event.preventDefault();
    values = this.formGroup.value;
    values.noteTime = this.formGroup.value.noteTime;
    values.subcontractor = this.formGroup.value.subcontractor;
    if (
      values.subcontractReworkOperationList === null ||
      values.subcontractReworkOperationList.length === 0
    ) {
      this.service.save(values).subscribe(data => {
        this.sharedService.addMessage({
          severity: 'info',
          summary: 'Success',
          detail: 'Operation Success'
        });
        this.resetForm();
        this.router.navigate(['/pages/subcontractNote/form/']);
      });
    } else {
      this.subcontractReworkNoteService.save(values).subscribe(xData => {
        this.sharedService.addMessage({
          severity: 'info',
          summary: 'Success',
          detail: 'Operation Success'
        });
        this.resetForm();
        this.router.navigate(['/pages/subcontractNote/form/']);
      });
    }
  }

  refresh(): void {
    this.getSubcontractorList();
  }

  public resetForm() {
    this.formGroup.reset();
    this.subcontractOperationFormGroup.reset();
    this.subcontractReworkOperationFormGroup.reset();
  }

  /*================== Subcontractor Filter ===================*/
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
    this.getSubcontractOperationRateListBySubcontractor(+subcontractorCombo.id);
    this.getSubcontractArrivalRejectListBySubcontractor(+subcontractorCombo.id);
  }

  /*================== Subcontractor Filter ===================*/
  /*================== Job Filter ===================*/
  filteredJobList: any[];

  filterJobList(event) {
    let query = event.query.toLowerCase();
    if (query.length > 2)
      this.jobService
        .getJobNoLike(query)
        .subscribe(jobList => (this.filteredJobList = jobList));
  }
  onJobSelect(event: any) {}
  /*================== Job Filter ===================*/
  /*================== SubcontractOperationRate Filter ===================*/
  filteredSubcontractOperationRateList: any[];

  filterSubcontractOperationRateList(event) {
    let query = event.query.toLowerCase();
    this.filteredSubcontractOperationRateList = [];
    for (let i = 0; i < this.subcontractOperationRateList.length; i++) {
      let subcontractOperationRate = this.subcontractOperationRateList[i];
      if (subcontractOperationRate.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredSubcontractOperationRateList.push(
          subcontractOperationRate
        );
      }
    }
  }
  onSubcontractOperationRateSelect(event: any) {}
  /*================== SubcontractOperationRate Filter ===================*/

  /*================== SubcontractArrivalReject Filter ===================*/
  filteredSubcontractArrivalRejectList: any[];

  filterSubcontractArrivalRejectList(event) {
    let query = event.query.toLowerCase();
    this.filteredSubcontractArrivalRejectList = [];
    for (let i = 0; i < this.subcontractArrivalRejectList.length; i++) {
      let subcontractArrivalReject = this.subcontractArrivalRejectList[i];
      if (subcontractArrivalReject.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredSubcontractArrivalRejectList.push(
          subcontractArrivalReject
        );
      }
    }
  }
  onSubcontractArrivalRejectSelect(event: any) {}

  /*================== SubcontractArrivalReject Filter ===================*/
}
