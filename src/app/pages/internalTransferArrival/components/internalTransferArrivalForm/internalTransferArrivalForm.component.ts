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
import { DataTable, ConfirmationService } from 'primeng/primeng';
import 'rxjs/add/operator/take';
import { InternalTransferNoteService } from '../../../internalTransferNote/internalTransferNote.service';

@Component({
  selector: 'internal-transfer-arrival-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./internalTransferArrivalForm.scss'],
  templateUrl: './internalTransferArrivalForm.html'
})
export class InternalTransferArrivalForm {
  public formGroup: FormGroup;
  @ViewChild(DataTable) dataTableComponent: DataTable;
  JSON: any = JSON;
  idTextField: HTMLInputElement;
  internalTransferNote: any = {};

  constructor(
    protected service: InternalTransferNoteService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService
  ) {
    this.formGroup = fb.group({
      id: '',
      arrivalTime: [null, Validators.required],
      fromLocation: [],
      toLocation: [],
    });
  }

  ngOnInit(): void {
    this.idTextField = <HTMLInputElement>document.getElementById('id');
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      id = id === undefined ? '0' : id;
      if (id !== '0') {
        this.loadForm(id);
      }
    });
  }

  fill(): void {
    this.clear();
    let id = this.formGroup.value.id;
    if (id === undefined || id === '') {
      return;
    }
    this.loadForm(id);
  }

  clear(): void {
    this.internalTransferNote = {};
    if (this.dataTableComponent !== undefined) {
      this.dataTableComponent.reset();
    }
  }

  loadForm(id: any) {
    this.service.get(+id).subscribe(internalTransferNote => {
      if (internalTransferNote != null) {
        if (internalTransferNote.arrivalTime !== null) {
          internalTransferNote.arrivalTime = new Date(
            internalTransferNote.arrivalTime
          );
        }
        this.internalTransferNote = internalTransferNote;
        this.idTextField.disabled = true;
      }
      this.formGroup.patchValue(this.internalTransferNote, { onlySelf: true });
    });
  }

  public onSubmit(values: any, event: Event): void {
    event.preventDefault();
    this.service.saveArrival(values).subscribe(data => {
      this.sharedService.addMessage({
        severity: 'info',
        summary: 'Success',
        detail: 'Operation Success'
      });
      this.resetForm();
    });
  }

  public resetForm() {
    this.idTextField.disabled = false;
    this.formGroup.reset();
    this.fill();
  }
}
