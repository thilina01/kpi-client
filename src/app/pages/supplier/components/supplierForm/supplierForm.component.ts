import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { SupplierService } from "../../supplier.service";
import { SupplierTypeService } from '../../../supplierType/supplierType.service';
import { PaymentTermService } from '../../../paymentTerm/paymentTerm.service';
import { CurrencyService } from '../../../currency/currency.service';
import { DeliveryTermService } from '../../../deliveryTerm/deliveryTerm.service';

@Component({
    selector: 'supplier-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./supplierForm.scss'],
    templateUrl: './supplierForm.html',
})
export class SupplierForm {

    deliveryTerm: any;
    paymentTerm: any;
    currency: any;
    supplierType: any;

    supplierTypeList = [];
    currencyList = [];
    paymentTermList = [];
    deliveryTermList = [];
    JSON: any = JSON;

    public formGroup: FormGroup;
    supplier: any = {};
    subscription: Subscription;

    constructor(protected service: SupplierService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private supplierTypeService: SupplierTypeService,
        private paymentTermService: PaymentTermService,
        private currencyService: CurrencyService,
        private deliveryTermService: DeliveryTermService,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            name: ['', Validators.required],
            shortName: '',
            contactPerson: '',
            contact: '',
            address: '',
            fax: '',
            email: '',
            deliveryTerm: [this.deliveryTerm, Validators.required],
            currency: [this.currency, Validators.required],
            paymentTerm: [this.paymentTerm, Validators.required],
            supplierType: [this.supplierType, Validators.required]
        });
    }

    getSupplierTypeList(): void {
        this.supplierTypeService.getCombo().subscribe(supplierTypeList => this.supplierTypeList = supplierTypeList);
    }

    getCurrencyList(): void {
        this.currencyService.getCombo().subscribe(currencyList => this.currencyList = currencyList);
    }

    getPaymentTermList(): void {
        this.paymentTermService.getCombo().subscribe(paymentTermList => this.paymentTermList = paymentTermList);
    }

    getDeliveryTermList(): void {
        this.deliveryTermService.getCombo().subscribe(deliveryTermList => this.deliveryTermList = deliveryTermList);
    }

    ngOnInit(): void {
        this.getSupplierTypeList();
        this.getCurrencyList();
        this.getPaymentTermList();
        this.getDeliveryTermList();
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
            this.supplier = data;
        }
        this.formGroup.patchValue(this.supplier, { onlySelf: true });
        this.supplierType = this.supplier.supplierType;
        this.deliveryTerm = this.supplier.deliveryTerm;
        this.currency = this.supplier.currency;
        this.paymentTerm = this.supplier.paymentTerm;
        this.setDisplayOfSupplierType();
        this.setDisplayOfPaymentTerm();
        this.setDisplayOfCurrency();
        this.setDisplayOfDeliveryTerm();

    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/supplier/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

    /*================== SupplierType Filter ===================*/
    filteredSupplierTypeList: any[];

    filterSupplierTypeList(event) {
        let query = event.query.toLowerCase();
        this.filteredSupplierTypeList = [];
        for (let i = 0; i < this.supplierTypeList.length; i++) {
            let supplierType = this.supplierTypeList[i];
            if (supplierType.code.toLowerCase().indexOf(query) == 0 || supplierType.name.toLowerCase().indexOf(query) == 0) {
                this.filteredSupplierTypeList.push(supplierType);
            }
        }
    }

    handleSupplierTypeDropdownClick() {
        this.filteredSupplierTypeList = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredSupplierTypeList = this.supplierTypeList;
        }, 100)
    }

    onSupplierTypeSelect(event: any) {
        this.setDisplayOfSupplierType();
    }

    setDisplayOfSupplierType() {
        let supplierType = this.formGroup.value.supplierType;
        if (supplierType != null && supplierType != undefined) {
            let display = supplierType.code != null && supplierType.code != undefined ? supplierType.code + " : " : "";
            display += supplierType.name != null && supplierType.name != undefined ? supplierType.name : "";
            this.formGroup.value.supplierType.display = display;
        }
    }
    /*================== SupplierType Filter ===================*/
    /*================== Payment TermFilter ===================*/
    filteredPaymentTerms: any[];

    filterPaymentTerms(event) {
        let query = event.query.toLowerCase();
        this.filteredPaymentTerms = [];
        for (let i = 0; i < this.paymentTermList.length; i++) {
            let paymentTerm = this.paymentTermList[i];
            if (paymentTerm.code.toLowerCase().indexOf(query) == 0 || paymentTerm.name.toLowerCase().indexOf(query) == 0) {
                this.filteredPaymentTerms.push(paymentTerm);
            }
        }
    }

    handlePaymentTermDropdownClick() {
        this.filteredPaymentTerms = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredPaymentTerms = this.paymentTermList;
        }, 100)
    }

    onPaymentTermSelect(event: any) {
        this.setDisplayOfPaymentTerm();
    }
    setDisplayOfPaymentTerm() {
        let paymentTerm = this.formGroup.value.paymentTerm;
        if (paymentTerm != null && paymentTerm != undefined) {
            let display = paymentTerm.code != null && paymentTerm.code != undefined ? paymentTerm.code + " : " : "";
            display += paymentTerm.name != null && paymentTerm.name != undefined ? paymentTerm.name : "";
            this.formGroup.value.paymentTerm.display = display;
        }
    }
    /*================== End Of Payment TermFilter =======================*/
    /*================== CurrencyFilter ===================*/
    filteredCurrencyList: any[];

    filterCurrencyList(event) {
        let query = event.query.toLowerCase();
        this.filteredCurrencyList = [];
        for (let i = 0; i < this.currencyList.length; i++) {
            let currency = this.currencyList[i];
            if (currency.code.toLowerCase().indexOf(query) == 0 || currency.name.toLowerCase().indexOf(query) == 0) {
                this.filteredCurrencyList.push(currency);
            }
        }
    }

    handleCurrencyDropdownClick() {
        this.filteredCurrencyList = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredCurrencyList = this.currencyList;
        }, 100)
    }

    onCurrencySelect(event: any) {
        this.setDisplayOfCurrency();

    }
    setDisplayOfCurrency() {
        let currency = this.formGroup.value.currency;
        if (currency != null && currency != undefined) {
            let display = currency.code != null && currency.code != undefined ? currency.code + " : " : "";
            display += currency.name != null && currency.name != undefined ? currency.name : "";
            this.formGroup.value.currency.display = display;
        }
    }

    /*================== DeliveryTermFilter ===================*/
    filteredDeliveryTermList: any[];

    filterDeliveryTermList(event) {
        let query = event.query.toLowerCase();
        this.filteredDeliveryTermList = [];
        for (let i = 0; i < this.deliveryTermList.length; i++) {
            let deliveryTerm = this.deliveryTermList[i];
            if (deliveryTerm.code.toLowerCase().indexOf(query) == 0 || deliveryTerm.name.toLowerCase().indexOf(query) == 0) {
                this.filteredDeliveryTermList.push(deliveryTerm);
            }
        }
    }

    handleDeliveryTermDropdownClick() {
        this.filteredDeliveryTermList = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredDeliveryTermList = this.deliveryTermList;
        }, 100)
    }

    onDeliveryTermSelect(event: any) {
        this.setDisplayOfDeliveryTerm();

    }
    setDisplayOfDeliveryTerm() {
        let deliveryTerm = this.formGroup.value.deliveryTerm;
        if (deliveryTerm != null && deliveryTerm != undefined) {
            let display = deliveryTerm.code != null && deliveryTerm.code != undefined ? deliveryTerm.code + " : " : "";
            display += deliveryTerm.name != null && deliveryTerm.name != undefined ? deliveryTerm.name : "";
            this.formGroup.value.deliveryTerm.display = display;
        }
    }

}






