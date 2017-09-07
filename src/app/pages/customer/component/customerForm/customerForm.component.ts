import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { CustomerService } from "../../customer.service";
import { CustomerTypeService } from "../../../customerType/customerType.service";
import { IncotermService } from "../../../incoterm/incoterm.service";
import { CurrencyService } from "../../../currency/currency.service";
import { NotifyPartyService } from "../../../notifyParty/notifyParty.service";
import { PaymentTermService } from "../../../paymentTerm/paymentTerm.service";
import { CountryService } from "../../../country/country.service";
import { AddressTypeService } from "../../../addressType/addressType.service";
import { ContactTypeService } from "../../../contactType/contactType.service";
import { DataTable, ConfirmationService } from "primeng/primeng";

@Component({
    selector: 'customer-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./customerForm.scss'],
    templateUrl: './customerForm.html',
})
export class CustomerForm {
    public formGroup: FormGroup;
    public contactFormGroup: FormGroup;
    public addressFormGroup: FormGroup;
    @ViewChild(DataTable) dataTable: DataTable;

    [x: string]: any;
    JSON: any = JSON;
    subscription: Subscription;

    contactList = [];
    addressList = [];

    paymentTermList = [];
    notifyPartyList = [];
    incotermList = [];
    currencyList = [];
    customerTypeList = [];
    countryList = [];
    addressTypeList = [];
    contactTypeList = [];

    paymentTerm: any = { id: '', code: '', name: '' }
    notifyParty: any = { id: '', code: '', name: '' }
    incoterm: any = { id: '', code: '', name: '' }
    currency: any = { id: '', code: '', name: '' }
    customerType: any = { id: '', code: '', name: '' }
    country: any = { id: '', code: '', name: '' }
    customer: any = { id: '', code: '', name: '' }
    addressType: any = { id: '', code: '', name: '' }
    contactType: any = { id: '', code: '', name: '' }

    constructor(protected service: CustomerService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService,
        private customerTypeService: CustomerTypeService,
        private confirmationService: ConfirmationService,
        private currencyService: CurrencyService,
        private incotermService: IncotermService,
        private paymentTermService: PaymentTermService,
        private countryService: CountryService,
        private addressTypeService: AddressTypeService,
        private contactTypeService: ContactTypeService,
        private notifyPartyService: NotifyPartyService) {
        this.formGroup = fb.group({
            id: '',
            shortName: "",
            code: ['', Validators.required],
            name: ['', Validators.required],
            consignee: "",
            continent: "",
            specialRequirements: "",
            note: "",
            vatNo: "",
            sVatNo: "",
            finalDestination: "",
            paymentTerm: [this.paymentTerm, Validators.required],
            notifyParty: [this.notifyParty, Validators.required],
            incoterm: [this.incoterm, Validators.required],
            currency: [this.currency, Validators.required],
            customerType: [this.customerType, Validators.required],
            contactList: [[]],
            addressList: [[]],

        });

        this.contactFormGroup = fb.group({
            contactNumber: "",
            contactType: [{}, Validators.compose([Validators.required])]
        });

        this.addressFormGroup = fb.group({
            line1: "",
            line2: "",
            line3: "",
            line4: "",
            line5: "",
            addressType: [{}, Validators.compose([Validators.required])],
            country: [{}, Validators.compose([Validators.required])]
        });

    }

    getCustomerTypeList(): void {
        this.customerTypeService.getCombo().subscribe(customerTypeList => this.customerTypeList = customerTypeList);
    }

    getCurrencyList(): void {
        this.currencyService.getCombo().subscribe(currencyList => this.currencyList = currencyList);
    }

    getIncotermList(): void {
        this.incotermService.getCombo().subscribe(incotermList => this.incotermList = incotermList);
    }

    getNotifyPartyList(): void {
        this.notifyPartyService.getCombo().subscribe(notifyPartyList => this.notifyPartyList = notifyPartyList);
    }

    getPaymentTermList(): void {
        this.paymentTermService.getCombo().subscribe(paymentTermList => this.paymentTermList = paymentTermList);
    }

    getCountryList(): void {
        this.countryService.getCombo().subscribe(countryList => this.countryList = countryList);
    }

    getAddressTypeList(): void {
        this.addressTypeService.getCombo().subscribe(addressTypeList => this.addressTypeList = addressTypeList);
    }

    getContactTypeList(): void {
        this.contactTypeService.getCombo().subscribe(contactTypeList => this.contactTypeList = contactTypeList);
    }

    refresh(): void {
        this.getCountryList();
        this.getCurrencyList();
        this.getIncotermList();
        this.getNotifyPartyList();
        this.getPaymentTermList();
        this.getAddressTypeList();
        this.getContactTypeList();
        this.getCustomerTypeList();
    }

    fillContacts(): void {

        this.formGroup.value.contactList = this.formGroup.value.contactList.slice();
        this.dataTable.reset();
    }

    fillAddresses(): void {

        this.formGroup.value.addressList = this.formGroup.value.addressList.slice();
        this.dataTable.reset();
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.refresh();
        }, 500);
        this.getCountryList();
        this.getCurrencyList();
        this.getIncotermList();
        this.getNotifyPartyList();
        this.getPaymentTermList();
        this.getAddressTypeList();
        this.getContactTypeList();
        this.getCustomerTypeList();
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
        if (data == null) {
            return;
        }
        this.customer = data;
        this.formGroup.patchValue(this.customer, { onlySelf: true });
        this.customerType = this.customer.customerType;
        this.currency = this.customer.currency;
        this.incoterm = this.customer.incoterm;
        this.notifyparty = this.customer.notifyparty;
        this.paymentTerm = this.customer.paymentTerm;
        this.country = this.customer.country;
        this.addressType = this.customer.addressType;
        this.contactType = this.customer.contactType;
        this.setDisplayOfCurrency();
        this.setDisplayOfNotifyParty();
        this.setDisplayOfPaymentTerm();
        this.setDisplayOfIncoterm();
        this.setDisplayOfCountry();
        this.setDisplayOfCustomerType();
        this.setDisplayOfAddressType();
        this.setDisplayOfContactType();

    }

    public onSubmit(values: any, event: Event): void {
        this.submitted = true;
        if (this.formGroup.valid) {

        if (values.contactList === null || values.contactList.length === 0) {
            alert('contact Required');
            return;
        }

        if (values.addressList === null || values.addressList.length === 0) {
            alert('address Required');
            return;
        }

        event.preventDefault();
        console.log(values);

        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/customer/form/']);
            }
        );
    }
}

    public resetForm() {
        this.formGroup.reset();
        this.contactFormGroup.reset();
        this.addressFormGroup.reset();
    }

    public removeContact(id: number) {
        if (this.formGroup.value.contactList != null) {
            this.confirmationService.confirm({
                message: 'Are you sure that you want to Delete?',
                accept: () => {
                    this.formGroup.value.contactList.splice(id, 1);
                    this.fillContacts();

                }
            });
        }
    }

    public removeAddress(id: number) {
        if (this.formGroup.value.addressList != null) {
            this.confirmationService.confirm({
                message: 'Are you sure that you want to Delete?',
                accept: () => {
                    this.formGroup.value.addressList.splice(id, 1);
                    this.fillAddresses();

                }
            });
        }
    }

    public onEnterContact(contactNumber: string, dt: DataTable) {
        if (this.contactFormGroup.valid) {
            let values = this.contactFormGroup.value;
            if (this.formGroup.value.contactList == null) {
                this.formGroup.value.contactList = [];
            }
            this.formGroup.value.contactList.push(values);
            this.contactFormGroup.reset();
            document.getElementById('contactNumber').focus();
            this.formGroup.value.contactList = this.formGroup.value.contactList.slice();
        }
        else {
            console.log(this.contactFormGroup.errors);
        }
    }

    public onEnterAddress(line5: string, dt: DataTable) {
        if (this.addressFormGroup.valid) {
            let values = this.addressFormGroup.value;
            if (this.formGroup.value.addressList == null) {
                this.formGroup.value.addressList = [];
            }

            this.formGroup.value.addressList.push(values);
            this.addressFormGroup.reset();
            document.getElementById('line5').focus();
            this.formGroup.value.addressList = this.formGroup.value.addressList.slice();
        }
        else {
            console.log(this.addressFormGroup.errors);
        }
    }
    /*================== CurrencyFilter ===================*/
    filteredCurrencyList: any[];
    //currency: any;

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

    /*================== Customer Type Filter ===================*/
    filteredCustomerTypes: any[];
    //customerType: any;

    filterCustomerTypes(event) {
        let query = event.query.toLowerCase();
        this.filteredCustomerTypes = [];
        for (let i = 0; i < this.customerTypeList.length; i++) {
            let customerType = this.customerTypeList[i];
            if (customerType.code.toLowerCase().indexOf(query) == 0 || customerType.name.toLowerCase().indexOf(query) == 0) {
                this.filteredCustomerTypes.push(customerType);
            }
        }
    }

    handleCustomerTypeDropdownClick() {
        this.filteredCustomerTypes = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredCustomerTypes = this.customerTypeList;
        }, 100)
    }

    onCustomerTypeSelect(event: any) {

        this.setDisplayOfCustomerType();
    }

    setDisplayOfCustomerType() {
        let customerType = this.formGroup.value.customerType;
        if (customerType != null && customerType != undefined) {
            let display = customerType.code != null && customerType.code != undefined ? customerType.code + " : " : "";
            display += customerType.name != null && customerType.name != undefined ? customerType.name : "";
            this.formGroup.value.customerType.display = display;
        }
    }
    /*================== End Of Customer Type Filter ===================*/
    /*================== Notify PartyFilter ===================*/
    filteredNotifyPartys: any[];
    //notifyParty: any;

    filterNotifyPartys(event) {
        let query = event.query.toLowerCase();
        this.filteredNotifyPartys = [];
        for (let i = 0; i < this.notifyPartyList.length; i++) {
            let notifyParty = this.notifyPartyList[i];
            if (notifyParty.code.toLowerCase().indexOf(query) == 0 || notifyParty.name.toLowerCase().indexOf(query) == 0) {
                this.filteredNotifyPartys.push(notifyParty);
            }
        }
    }

    handleNotifyPartyDropdownClick() {
        this.filteredNotifyPartys = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredNotifyPartys = this.notifyPartyList;
        }, 100)
    }

    onNotifyPartySelect(event: any) {

        this.setDisplayOfNotifyParty();
    }

    setDisplayOfNotifyParty() {
        let notifyParty = this.formGroup.value.notifyParty;
        if (notifyParty != null && notifyParty != undefined) {
            let display = notifyParty.code != null && notifyParty.code != undefined ? notifyParty.code + " : " : "";
            display += notifyParty.name != null && notifyParty.name != undefined ? notifyParty.name : "";
            this.formGroup.value.notifyParty.display = display;
        }
    }

    /*================== End Of Notify PartyFilter ===================*/
    /*================== Payment TermFilter ===================*/
    filteredPaymentTerms: any[];
    //paymentTerm: any;

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
    /*================== End Of Payment TermFilter ===================*/
    /*================== Incoterm Filter ===================*/
    filteredIncoterms: any[];
    //incoterm: any;

    filterIncoterms(event) {
        let query = event.query.toLowerCase();
        this.filteredIncoterms = [];
        for (let i = 0; i < this.incotermList.length; i++) {
            let incoterm = this.incotermList[i];
            if (incoterm.code.toLowerCase().indexOf(query) == 0 || incoterm.name.toLowerCase().indexOf(query) == 0) {
                this.filteredIncoterms.push(incoterm);
            }
        }
    }

    handleIncotermDropdownClick() {
        this.filteredIncoterms = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredIncoterms = this.incotermList;
        }, 100)
    }

    onIncotermSelect(event: any) {
        this.setDisplayOfIncoterm();
    }

    setDisplayOfIncoterm() {
        let incoterm = this.formGroup.value.incoterm;
        if (incoterm != null && incoterm != undefined) {
            let display = incoterm.code != null && incoterm.code != undefined ? incoterm.code + " : " : "";
            display += incoterm.name != null && incoterm.name != undefined ? incoterm.name : "";
            this.formGroup.value.incoterm.display = display;
        }
    }

    /*================== End Of Incoterm Filter ===================*/

    /*================== Address Type Filter ===================*/
    filteredAddressTypes: any[];
    //addressType: any;

    filterAddressTypes(event) {
        let query = event.query.toLowerCase();
        this.filteredAddressTypes = [];
        for (let i = 0; i < this.addressTypeList.length; i++) {
            let addressType = this.addressTypeList[i];
            if (addressType.code.toLowerCase().indexOf(query) == 0 || addressType.name.toLowerCase().indexOf(query) == 0) {
                this.filteredAddressTypes.push(addressType);
            }
        }
    }

    handleAddressTypeDropdownClick() {
        this.filteredAddressTypes = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredAddressTypes = this.addressTypeList;
        }, 100)
    }

    onAddressTypeSelect(event: any) {

        this.setDisplayOfAddressType();
    }

    setDisplayOfAddressType() {
        let addressType = this.addressFormGroup.value.addressType;
        if (addressType != null && addressType != undefined) {
            let display = addressType.code != null && addressType.code != undefined ? addressType.code + " : " : "";
            display += addressType.name != null && addressType.name != undefined ? addressType.name : "";
            this.addressFormGroup.value.addressType.display = display;
        }
    }
    /*================== End Of Address Type Filter ===================*/
    /*================== ContactTypeFilter ===================*/
    filteredContactTypeList: any[];
    //contactType: any;

    filterContactTypeList(event) {
        let query = event.query.toLowerCase();
        this.filteredContactTypeList = [];
        for (let i = 0; i < this.contactTypeList.length; i++) {
            let contactType = this.contactTypeList[i];
            if (contactType.code.toLowerCase().indexOf(query) == 0 || contactType.name.toLowerCase().indexOf(query) == 0) {
                this.filteredContactTypeList.push(contactType);
            }
        }
    }

    handleContactTypeDropdownClick() {
        this.filteredContactTypeList = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredContactTypeList = this.contactTypeList;
        }, 100)
    }

    onContactTypeSelect(event: any) {
        this.setDisplayOfContactType();
    }

    setDisplayOfContactType() {
        let contactType = this.contactFormGroup.value.contactType;
        if (contactType != null && contactType != undefined) {
            let display = contactType.code != null && contactType.code != undefined ? contactType.code + " : " : "";
            display += contactType.name != null && contactType.name != undefined ? contactType.name : "";
            this.contactFormGroup.value.contactType.display = display;
        }
    }

    /*================== CountryFilter ===================*/
    filteredCountryList: any[];
    //country: any;

    filterCountryList(event) {
        let query = event.query.toLowerCase();
        this.filteredCountryList = [];
        for (let i = 0; i < this.countryList.length; i++) {
            let country = this.countryList[i];
            if (country.code.toLowerCase().indexOf(query) == 0 || country.name.toLowerCase().indexOf(query) == 0) {
                this.filteredCountryList.push(country);
            }
        }
    }

    handleCountryDropdownClick() {
        this.filteredCountryList = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredCountryList = this.countryList;
        }, 100)
    }

    onCountrySelect(event: any) {
        this.setDisplayOfCountry();
    }

    setDisplayOfCountry() {
        let country = this.addressFormGroup.value.country;
        if (country != null && country != undefined) {
            let display = country.code != null && country.code != undefined ? country.code + " : " : "";
            display += country.name != null && country.name != undefined ? country.name : "";
            this.addressFormGroup.value.country.display = display;
        }
    }
}
