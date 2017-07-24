import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { SharedService } from '../../../../services/shared.service';
import { CustomerTypeService } from "../../../../services/customerType.service";
import { CustomerService } from "../../../../services/customer.service";
import { CurrencyService } from "../../../../services/currency.service";
import { IncotermService } from "../../../../services/incoterm.service";
import { PaymentTermService } from "../../../../services/paymentTerm.service";
import { NotifyPartyService } from "../../../../services/notifyParty.service";

@Component({
    selector: 'customer-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./customerForm.scss'],
    templateUrl: './customerForm.html',
})
export class CustomerForm {
    [x: string]: any;
    JSON: any = JSON;

    public formGroup: FormGroup;
    subscription: Subscription;

    paymentTermList = [];
    notifyPartyList = [];
    incotermList = [];
    currencyList = [];
    customerTypeList = [];

    paymentTerm: any = { id: '', code: '', name: '' }
    notifyParty: any = { id: '', code: '', name: '' }
    incoterm: any = { id: '', code: '', name: '' }
    currency: any = { id: '', code: '', name: '' }
    customerType: any = { id: '', code: '', name: '' }

    customer: any = { id: '', code: '', name: '' }

    constructor(protected service: CustomerService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService,
        private customerTypeService: CustomerTypeService,
        private currencyService: CurrencyService,
        private incotermService: IncotermService,
        private paymentTermService: PaymentTermService,
        private notifyPartyService: NotifyPartyService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            name: ['', Validators.required],
            shortName: ['', Validators.required],
            consignee: ['', Validators.required],
            continent: ['', Validators.required],
            specialRequirements: ['', Validators.required],
            fax: ['', Validators.required],
            note: ['', Validators.required],
            vatNo: ['', Validators.required],
            sVatNo: ['', Validators.required],
            finalDestination: ['', Validators.required],
            paymentTerm: [this.paymentTerm, Validators.required],
            notifyParty: [this.notifyParty, Validators.required],
            incoterm: [this.incoterm, Validators.required],
            currency: [this.currency, Validators.required],
            customerType: [this.customerType, Validators.required]
        });
    }

    getCustomerTypeList(): void {
        this.customerTypeService.getCombo().then(customerTypeList => this.customerTypeList = customerTypeList);
    }

    getCurrencyList(): void {
        this.currencyService.getCombo().then(currencyList => this.currencyList = currencyList);
    }

    getIncotermList(): void {
        this.incotermService.getCombo().then(incotermList => this.incotermList = incotermList);
    }

    getNotifyPartyList(): void {
        this.notifyPartyService.getCombo().then(notifyPartyList => this.notifyPartyList = notifyPartyList);
    }
    
    getPaymentTermList(): void {
        this.paymentTermService.getCombo().then(paymentTermList => this.paymentTermList = paymentTermList);
    }
    

    ngOnInit(): void {
        this.getCustomerTypeList();
        this.getCurrencyList();
        this.getIncotermList();
        this.getNotifyPartyList();
        this.getPaymentTermList();
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.getOne(+id).then(
                        (data) => {
                            this.loadForm(data);
                        }
                    )
                }
            }
        );
    }

    loadForm(data: any) {
        if (data == null) {
            return;
        }
        this.customer = data;
        this.formGroup.patchValue(this.customer, { onlySelf: true });
        this.customerType = this.customer.customerType;
        this.currency = this.customer.currency;
        this.incoterm = this.customer.incoterm;
        this.notifyparty= this.customer.notifyparty;
        this.paymentTerm = this.customer.paymentTerm;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/customer/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
