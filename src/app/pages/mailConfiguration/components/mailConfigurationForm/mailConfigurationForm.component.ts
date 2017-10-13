import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { MailConfigurationService } from '../../mailConfiguration.service';

@Component({
    selector: 'mail-configuration-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./mailConfigurationForm.scss'],
    templateUrl: './mailConfigurationForm.html',
})
export class MailConfigurationForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    mailConfiguration: any;
    subscription: Subscription;
    mailConfigurationType: any;

    constructor(protected service: MailConfigurationService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            host: ['', Validators.required],
            port: ['', Validators.required],
            user: ['', Validators.required],
            password: ['', Validators.required]
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
            this.mailConfiguration = data;
        }
        this.formGroup.patchValue(this.mailConfiguration, { onlySelf: true });
        this.mailConfigurationType = this.mailConfiguration.mailConfigurationType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/mailConfiguration/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
