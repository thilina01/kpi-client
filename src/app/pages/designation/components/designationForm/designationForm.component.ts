import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { DesignationService } from '../../designation.service';

@Component({
    selector: 'designation-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./designationForm.scss'],
    templateUrl: './designationForm.html',
})
export class DesignationForm {

    JSON: any = JSON;

    public formGroup: FormGroup;
    designation: any = {};
    subscription: Subscription;
    designationType: any;

    constructor(protected service: DesignationService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            name: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.get(+id).subscribe(
                        (data) => {
                            this.loadForm(data);
                        }
                    )
                }
            }
        );
    }

    loadForm(data: any) {
        if (data != null) {
            this.designation = data;
        }
        this.formGroup.patchValue(this.designation, { onlySelf: true });
        this.designationType = this.designation.designationType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/designation/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
