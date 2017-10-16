import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ContactTypeService } from '../../contactType.service';

@Component({
    selector: 'contact-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./contactTypeForm.scss'],
    templateUrl: './contactTypeForm.html',
})
export class ContactTypeForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    contactType: any = {};
    subscription: Subscription;

    contactTypeTypes: any;
    paints: any;

    contactTypeDate: Date;
    contactTypeTime: Date = new Date();
    recoveryTime: Date = new Date();
    contactTypeType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }

    constructor(protected service: ContactTypeService,
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
            this.contactType = data;
        }
        this.formGroup.patchValue(this.contactType, { onlySelf: true });
        this.contactTypeType = this.contactType.contactTypeType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/contactType/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
