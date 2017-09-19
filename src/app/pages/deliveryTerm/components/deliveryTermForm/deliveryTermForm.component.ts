import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { DeliveryTermService } from "../../deliveryTerm.service";

@Component({
    selector: 'delivery-term-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./deliveryTermForm.scss'],
    templateUrl: './deliveryTermForm.html',
})
export class DeliveryTermForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    deliveryTerm: any;
    subscription: Subscription;
    deliveryTermType: any ;

    constructor(protected service: DeliveryTermService,
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
            this.deliveryTerm = data;
        }
        this.formGroup.patchValue(this.deliveryTerm, { onlySelf: true });
        this.deliveryTermType = this.deliveryTerm.deliveryTermType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/deliveryTerm/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
