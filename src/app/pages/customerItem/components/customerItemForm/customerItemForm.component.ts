import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { CustomerItemService } from '../../customerItem.service';
import { CustomerService } from '../../../customer/customer.service';
import { ItemService } from '../../../item/item.service';

@Component({
    selector: 'customer-item-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./customerItemForm.scss'],
    templateUrl: './customerItemForm.html',
})
export class CustomerItemForm {
    ItemService: any;
    JSON: any = JSON;

    public formGroup: FormGroup;
    customerItem: any = {};
    subscription: Subscription;

    customerList = [];
    itemList = [];

    customer: any = { id: '', code: '', name: '' }
    item: any = { id: '', code: '', name: '' }

    customerItemTypes: any;
    paints: any;

    customerItemDate: Date;
    customerItemTime: Date = new Date();
    recoveryTime: Date = new Date();
    customerItemType: any = { id: '', code: '', type: '' }

    constructor(protected service: CustomerItemService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private customerService: CustomerService,
        private itemService: ItemService,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            name: '',
            code: '',
            customer: [this.customer, Validators.required],
            item: [this.item, Validators.required],
        });
    }

    getCustomerList(): void {
        this.customerService.getCombo().subscribe(customerList => this.customerList = customerList);
    }
    getItemList(): void {
        this.itemService.getCombo().subscribe(itemList => this.itemList = itemList);
    }

    ngOnInit(): void {
        this.getCustomerList();
        this.getItemList();
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
            this.customerItem = data;
        }
        this.formGroup.patchValue(this.customerItem, { onlySelf: true });
        this.customerItemType = this.customerItem.customerItemType;
        this.customer = this.customerItem.customer;
        this.item = this.customerItem.item;
        this.setDisplayOfItem();
        this.setDisplayOfCustomer();

    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/customerItem/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }


    /*================== CustomerFilter ===================*/
    filteredCustomerList: any[];

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
            let display = customer.code != null && customer.code != undefined ? customer.code + ' : ' : '';
            display += customer.name != null && customer.name != undefined ? customer.name : '';
            this.formGroup.value.customer.display = display;
        }

    }
    /*================== ItemFilter ===================*/
    filteredItemList: any[];

    filterItemList(event) {
        let query = event.query.toLowerCase();
        this.filteredItemList = [];
        for (let i = 0; i < this.itemList.length; i++) {
            let item = this.itemList[i];
            if (item.code.toLowerCase().indexOf(query) == 0 || item.name.toLowerCase().indexOf(query) == 0) {
                this.filteredItemList.push(item);
            }
        }
    }

    handleItemDropdownClick() {
        this.filteredItemList = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredItemList = this.itemList;
        }, 100)
    }

    onItemSelect(event: any) {
        this.setDisplayOfItem();
    }
    setDisplayOfItem() {
        let item = this.formGroup.value.item;
        if (item != null && item != undefined) {
            let display = item.code != null && item.code != undefined ? item.code + ' : ' : '';
            display += item.name != null && item.name != undefined ? item.name : '';
            this.formGroup.value.item.display = display;
        }
    }
}