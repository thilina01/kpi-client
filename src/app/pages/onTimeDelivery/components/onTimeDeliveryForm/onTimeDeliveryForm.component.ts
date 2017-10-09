import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { OnTimeDeliveryService } from "../../onTimeDelivery.service";
import { CustomerService } from '../../../customer/customer.service';

@Component({
    selector: 'on-time-delivery-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./onTimeDeliveryForm.scss'],
    templateUrl: './onTimeDeliveryForm.html',
})
export class OnTimeDeliveryForm {
    customerList: any;
    JSON: any = JSON;

    public formGroup: FormGroup;
    onTimeDelivery: any = {};
    subscription: Subscription;
    effectiveMonth: Date;
    customer: any = { id: '', code: '', name: '' }
    constructor(protected service: OnTimeDeliveryService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private customerService: CustomerService,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            effectiveMonth: [this.effectiveMonth, Validators.required],
            actual: ['', Validators.required],
            plan: ['', Validators.required],
            customer: [this.customer, Validators.required],

        });
    }

    getCustomerList(): void {
        this.customerService.getCombo().subscribe(customerList => this.customerList = customerList);
    }

    ngOnInit(): void {
        this.getCustomerList();
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
            data.effectiveMonth = new Date(data.effectiveMonth);
            this.onTimeDelivery = data;
        }
        this.formGroup.patchValue(this.onTimeDelivery, { onlySelf: true });
        this.customer = this.onTimeDelivery.customer;
        this.setDisplayOfCustomer();
    }
    
    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/onTimeDelivery/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

    /*================== CustomerFilter ===================*/
    filteredCustomerList: any[];
    //customer: any;

    filterCustomerList(event) {
        let query = event.query.toLowerCase();
        this.filteredCustomerList = [];
        for (let i = 0; i < this.customerList.length; i++) {
            let customer = this.customerList[i];
            if (customer.code.toLowerCase().indexOf(query) == 0 || customer.name.toLowerCase().indexOf(query) == 0) {
                this.filteredCustomerList.push(customer);
            }
        }
    }

    handleCustomerDropdownClick() {
        this.filteredCustomerList = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredCustomerList = this.customerList;
        }, 100)
    }

    onCustomerSelect(event: any) {
        this.setDisplayOfCustomer();
    }

    setDisplayOfCustomer() {
        let customer = this.formGroup.value.customer;
        if (customer != null && customer != undefined) {
            let display = customer.code != null && customer.code != undefined ? customer.code + " : " : "";
            display += customer.name != null && customer.name != undefined ? customer.name : "";
            this.formGroup.value.customer.display = display;
        }

    }
    /*================== Customer Filter ===================*/
}