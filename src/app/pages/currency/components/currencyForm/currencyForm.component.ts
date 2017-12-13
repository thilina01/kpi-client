import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { CurrencyService } from '../../currency.service';
import 'rxjs/add/operator/take';

@Component({
    selector: 'currency-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./currencyForm.scss'],
    templateUrl: './currencyForm.html',
})
export class CurrencyForm {
    JSON: any = JSON;

    currency: any = {};

    constructor(protected service: CurrencyService,
        private route: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.get(+id).take(1).subscribe(currency => { if (currency) this.currency = currency; });
        }
    }

    public save(currency: any): void {
        this.service.save(currency).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.router.navigate(['/pages/currency/form/']);
            }
        );
    }
}
