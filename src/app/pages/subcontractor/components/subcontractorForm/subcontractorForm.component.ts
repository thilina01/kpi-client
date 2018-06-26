import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { SubcontractorService } from '../../subcontractor.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'subcontractor-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./subcontractorForm.scss'],
  templateUrl: './subcontractorForm.html'
})
export class SubcontractorForm {
  formGroup: FormGroup;
  labourSources: any;

  constructor(
    protected service: SubcontractorService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder,
    private sharedService: SharedService
  ) {
    this.formGroup = fb.group({
      id: '',
      address: '',
      contact: '',
      validity: ['', Validators.required],
      code: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      if (id !== undefined && id !== '0') {
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
      this.formGroup.patchValue(data, { onlySelf: true });
    }
  }

  refresh(): void {}

  public onSubmit(values: any, event: Event): void {
    event.preventDefault();
    console.log(values);
    this.service.save(values).subscribe(() => {
      this.sharedService.addMessage({
        severity: 'info',
        summary: 'Success',
        detail: 'Operation Success'
      });
      this.resetForm();
      this.router.navigate(['/pages/subcontractor/form/']);
    });
  }

  public resetForm() {
    this.formGroup.reset();
  }
}
