import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { AbsenteeismService } from '../../absenteeism.service';
import { LabourSourceService } from '../../../labourSource/labourSource.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'absenteeism-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./absenteeismForm.scss'],
  templateUrl: './absenteeismForm.html',
})
export class AbsenteeismForm {

  formGroup: FormGroup;
  labourSources: any;

  constructor(protected service: AbsenteeismService,
    private route: ActivatedRoute,
    private router: Router, fb: FormBuilder,
    private sharedService: SharedService,
    private labourSourceService: LabourSourceService) {
    this.formGroup = fb.group({
      id: null,
      effectiveMonth: [null, Validators.required],
      absenteeism: [null, Validators.required],
      target: [null, Validators.required],
      labourSource: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        if (id != undefined && id != '0') {
          this.service.get(+id).take(1).subscribe(
            (data) => {
              this.loadForm(data);
            }
          )
        }
      }
    );
    this.getLabourSources();
  }

  loadForm(data: any) {
    if (data != null) {
      data.effectiveMonth = new Date(data.effectiveMonth);
      this.formGroup.patchValue(data, { onlySelf: true });
    }
  }

  getLabourSources(): void {
    this.labourSourceService.getCombo().subscribe(labourSources => this.labourSources = labourSources);
  }
  refresh(): void {
    this.getLabourSources();
  }

  public onSubmit(values: any, event: Event): void {
    event.preventDefault();
    console.log(values);
    this.service.save(values).subscribe(
      () => {
        this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
        this.resetForm();
        this.router.navigate(['/pages/absenteeism/form/']);
      }
    );
  }

  public resetForm() {
    this.formGroup.reset();
  }

  /*================== Labour Source Filter ===================*/
  filteredLabourSources: any[];

  filterLabourSources(event) {
    let query = event.query.toLowerCase();
    this.filteredLabourSources = [];
    for (let labourSource of this.labourSources) {
      if (labourSource.code.toLowerCase().indexOf(query) == 0 || labourSource.name.toLowerCase().indexOf(query) == 0) {
        this.filteredLabourSources.push(labourSource);
      }
    }
  }
  /*================== End Of Labour Source Filter ===================*/
}


