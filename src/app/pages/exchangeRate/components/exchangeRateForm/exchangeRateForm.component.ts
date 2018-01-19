import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ExchangeRateService } from '../../exchangeRate.service';
import 'rxjs/add/operator/take';
import { CurrencyService } from '../../../currency/currency.service';

@Component({
    selector: 'exchange-rate-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./exchangeRateForm.scss'],
    templateUrl: './exchangeRateForm.html',
})
export class ExchangeRateForm {
    exchangeRateDate: Date;
    JSON: any = JSON;

    public formGroup: FormGroup;
    exchangeRate: any = {};
    subscription: Subscription;
    exchangeRateType: any;
    currency: any = { id: '', code: '', name: '' }
    currencyList = [];

    constructor(protected service: ExchangeRateService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService,
        private currencyService: CurrencyService) {
        this.formGroup = fb.group({
            id: '',
            exchangeRateDate: [this.exchangeRateDate, Validators.required],
            exchangeRate: ['', Validators.required],
            currency: [this.currency, Validators.required]
        });
    }

    getCurrencyList(): void {
        this.currencyService.getCombo().subscribe(currencyList => this.currencyList = currencyList);
    }

    ngOnInit(): void {
        this.getCurrencyList();
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
        this.getCurrencyList();
    }

    loadForm(data: any) {
        if (data != null) {
            this.exchangeRate = data;
            data.exchangeRateDate = new Date(data.exchangeRateDate);

        }
        this.formGroup.patchValue(this.exchangeRate, { onlySelf: true });
        this.exchangeRateType = this.exchangeRate.exchangeRateType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/exchangeRate/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }
    /*================== CurrencyFilter ===================*/
    filteredCurrencyList: any[];

    filterCurrencyList(event) {
        let query = event.query.toLowerCase();
        this.filteredCurrencyList = [];
        for (let i = 0; i < this.currencyList.length; i++) {
            let currency = this.currencyList[i];
            if (currency.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredCurrencyList.push(currency);

            }
        }
    }

    onCurrencySelect(event: any) {

    }
    /*================== Customer Type Filter ===================*/
}
