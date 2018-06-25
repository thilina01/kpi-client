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
import { SubcontractorOperationService } from '../../subcontractorOperation.service';
import 'rxjs/add/operator/take';
import { SubcontractorService } from '../../../subcontractor/subcontractor.service';
import { SubcontractOperationDefinitionService } from '../../../subcontractOperationDefinition/subcontractOperationDefinition.service';

@Component({
  selector: 'subcontractor-operation-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./subcontractorOperationForm.scss'],
  templateUrl: './subcontractorOperationForm.html'
})
export class SubcontractorOperationForm {
  JSON: any = JSON;
  subcontractor: any;
  subcontractorList: any;
  subscription: Subscription;
  public formGroup: FormGroup;
  subcontractorOperation: any = {};
  subcontractOperationDefinition: any;
  subcontractOperationDefinitionList: any;

  constructor(
    protected service: SubcontractorOperationService,
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private subcontractorService: SubcontractorService,
    private subcontractOperationDefinitionService: SubcontractOperationDefinitionService
  ) {
    this.formGroup = fb.group({
      id: '',
      subcontractor: [this.subcontractor, Validators.required],
      subcontractOperationDefinition: [
        this.subcontractOperationDefinition,
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

  getSubcontractOperationDefinitionList(): void {
    this.subcontractOperationDefinitionService
      .getCombo()
      .subscribe(
        subcontractOperationDefinitionList =>
          (this.subcontractOperationDefinitionList = subcontractOperationDefinitionList)
      );
  }

  ngOnInit(): void {
    this.getSubcontractorList();
    this.getSubcontractOperationDefinitionList();
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
      data.effectiveMonth = new Date(data.effectiveMonth);
      this.subcontractorOperation = data;
    }
    this.formGroup.patchValue(this.subcontractorOperation, { onlySelf: true });
  }

  public onSubmit(values: any, event: Event): void {
    event.preventDefault();
    values.subcontractOperationDefinition = {id:values.subcontractOperationDefinition.id};
    values.subcontractor = {id:values.subcontractor.id};
    console.log(values);
    this.service.save(values).subscribe(data => {
      this.sharedService.addMessage({
        severity: 'info',
        summary: 'Success',
        detail: 'Operation Success'
      });
      this.resetForm();
      this.router.navigate(['/pages/subcontractorOperation/form/']);
    });
  }

  refresh(): void {
    this.getSubcontractorList();
    this.getSubcontractOperationDefinitionList();
  }

  public resetForm() {
    this.formGroup.reset();
  }

  /*================== Subcontract Operation DefinitionFilter ===================*/
  filteredSubcontractOperationDefinitionList: any[];

  filterSubcontractOperationDefinitionList(event) {
    let query = event.query.toLowerCase();
    this.filteredSubcontractOperationDefinitionList = [];
    for (let i = 0; i < this.subcontractOperationDefinitionList.length; i++) {
      let subcontractOperationDefinition = this
        .subcontractOperationDefinitionList[i];
      if (
        subcontractOperationDefinition.display.toLowerCase().indexOf(query) >= 0
      ) {
        this.filteredSubcontractOperationDefinitionList.push(
          subcontractOperationDefinition
        );
      }
    }
  }
  onSubcontractOperationDefinitionSelect(event: any) {}
  /*================== Subcontract Operation DefinitionFilter ===================*/

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
  onSubcontractorSelect(event: any) {}
  /*================== SubcontractorFilter ===================*/
}
