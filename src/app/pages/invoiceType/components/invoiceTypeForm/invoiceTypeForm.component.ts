import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { InvoiceTypeService } from '../../invoiceType.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'invoice-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./invoiceTypeForm.scss'],
    templateUrl: './invoiceTypeForm.html',
})
export class InvoiceTypeForm {
    JSON: any = JSON;
    public formGroup: FormGroup;
    invoiceType: any = {};
    subscription: Subscription;
    invoiceTypeType: any;

    constructor(protected service: InvoiceTypeService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            name: ['', Validators.required],
            code: ['', Validators.required],
            taxRate: '',
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.get(+id).take(1).subscribe(
                        (data) => {
                            this.loadForm(data);
                        }
                    )
                }
            }
        );
    }

    refresh(): void {
    }

    loadForm(data: any) {
        if (data != null) {
            this.invoiceType = data;
        }
        this.formGroup.patchValue(this.invoiceType, { onlySelf: true });
        this.invoiceTypeType = this.invoiceType.invoiceTypeType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/invoiceType/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }
}
