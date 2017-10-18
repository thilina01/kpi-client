import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { OrganizationService } from '../../organization.service';

@Component({
    selector: 'organization-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./organizationForm.scss'],
    templateUrl: './organizationForm.html',
})
export class OrganizationForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    organization: any = {};
    subscription: Subscription;
    organizationType: any;

    constructor(protected service: OrganizationService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            name: ['', Validators.required],
            slogan1: '',
            slogan2: '',
            vat: '',
            svat: '',
            address1: '',
            address2: '',
            address3: '',
            address4: '',
            address5: '',

        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.getOne(+id).subscribe(
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
            this.organization = data;
        }
        this.formGroup.patchValue(this.organization, { onlySelf: true });
        this.organizationType = this.organization.organizationType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/organization/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
