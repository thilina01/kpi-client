import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';



import { SharedService } from '../../../../services/shared.service';
import { PaymentTermService } from "../../paymentTerm.service";

@Component({
    selector: 'payment-term-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./paymentTermForm.scss'],
    templateUrl: './paymentTermForm.html',
})
export class PaymentTermForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    paymentTerm: any = {};
    subscription: Subscription;

    paymentTermTypes: any;
    paints: any;

    paymentTermDate: Date;
    paymentTermTime: Date = new Date();
    recoveryTime: Date = new Date();
    paymentTermType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }


    constructor(protected service: PaymentTermService,
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
            this.paymentTerm = data;
        }
        this.formGroup.patchValue(this.paymentTerm, { onlySelf: true });
        this.paymentTermType = this.paymentTerm.paymentTermType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/paymentTerm/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
