import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { PaymentTermService } from '../../paymentTerm.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'payment-term-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./paymentTermForm.scss'],
    templateUrl: './paymentTermForm.html',
})
export class PaymentTermForm {
    JSON: any = JSON;

    paymentTerm: any = {};

    constructor(protected service: PaymentTermService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(paymentTerm => { if (paymentTerm) this.paymentTerm = paymentTerm; });
        }
    }

    public save(paymentTerm: any): void {
        this.service.save(paymentTerm).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/paymentTerm/form/']);
            }
        );
    }
}
