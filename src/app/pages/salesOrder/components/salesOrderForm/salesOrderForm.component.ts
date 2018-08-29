import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { SalesOrderService } from '../../salesOrder.service';
import { CustomerItemService } from '../../../customerItem/customerItem.service';
import { CustomerService } from '../../../customer/customer.service';
import { SalesOrderTypeService } from '../../../salesOrderType/salesOrderType.service';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import 'rxjs/add/operator/take';

@Component({
    selector: 'sales-order-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./salesOrderForm.scss'],
    templateUrl: './salesOrderForm.html',
})

export class SalesOrderForm {
    @Input('formGroup')
    public formGroup: FormGroup;
    @ViewChild(DataTable) dataTable: DataTable;
    public salesOrderItemFormGroup: FormGroup;
    customerItem: Array<any>;
    totalRecords = 0;

    salesOrderType: any;
    customer: any;
    orderDate: Date;

    JSON: any = JSON;

    public FormGroup: FormGroup;
    salesOrder: any = {};
    subscription: Subscription;

    customerItemList = [];
    salesOrderTypeList = [];
    customerList = [];

    constructor(protected service: SalesOrderService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private customerItemService: CustomerItemService,
        private customerService: CustomerService,
        private salesOrderTypeService: SalesOrderTypeService,
        private sharedService: SharedService) {

        this.formGroup = fb.group({
            id: '',
            quantity: 0,
            amount: 0,
            customerPoNumber: ['', Validators.required],
            salesOrderNumber: ['', Validators.required],
            orderDate: [this.orderDate, Validators.required],
            customer: [this.customer, Validators.required],
            salesOrderType: [this.salesOrderType, Validators.required],
            salesOrderItemList: [[]],
        });

        this.salesOrderItemFormGroup = fb.group({
            unitPrice: '',
            quantity: '',
            amount: '',
            remarks: '',
            customerItem: [{}, Validators.compose([Validators.required])],
        });
    }

    getCustomerList(): void {
        this.customerService.getCombo().subscribe(customerList => this.customerList = customerList);
    }

    getCustomerItemList(): void {
        this.customerItemService.getComboByCustomer(this.formGroup.value.customer).subscribe(customerItemList => this.customerItemList = customerItemList);
    }

    getSalesOrderTypeList(): void {
        this.salesOrderTypeService.getCombo().subscribe(salesOrderTypeList => this.salesOrderTypeList = salesOrderTypeList);
    }

    refresh(): void {
        this.getCustomerList();
        this.getSalesOrderTypeList();
    }

    fillSalesOrderItems(): void {
        this.formGroup.value.salesOrderItemList = this.formGroup.value.salesOrderItemList.slice();
        this.dataTable.reset();
    }

    onEditComplete() {
        this.calculateTotal();
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.refresh();
        }, 500);
        this.getCustomerList();
        this.getSalesOrderTypeList();
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

    loadForm(data: any) {
        if (data != null) {
            data.orderDate = new Date(data.orderDate);
            this.salesOrder = data;
        }
        this.formGroup.patchValue(this.salesOrder, { onlySelf: true });
        this.customer = this.salesOrder.customer;
        this.salesOrderType = this.salesOrder.salesOrderType;
        this.customerItem = this.salesOrder.customerItem;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        if (values.salesOrderItemList === null || values.salesOrderItemList.length === 0) {
            alert('Items Required');
            return;
        }
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/salesOrder/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
        this.salesOrderItemFormGroup.reset();
    }

    public removeSalesOrderItem(id: number) {
        if (this.formGroup.value.salesOrderItemList != null) {
            this.confirmationService.confirm({
                message: 'Are you sure that you want to Delete?',
                accept: () => {
                    this.formGroup.value.salesOrderItemList.splice(id, 1);
                    this.fillSalesOrderItems();
                    this.calculateTotal();
                }
            });
        }
    }

    public onEnter(unitPrice: string, dt: DataTable) {
        if (this.salesOrderItemFormGroup.valid) {
            let values = this.salesOrderItemFormGroup.value;
            if (this.formGroup.value.salesOrderItemList == null) {
                this.formGroup.value.salesOrderItemList = [];
            }
            values.amount = values.unitPrice * values.quantity;
            this.formGroup.value.salesOrderItemList.push(values);
            this.calculateTotal();
            this.salesOrderItemFormGroup.reset();
            document.getElementById('customerItemSelector').focus();
            this.formGroup.value.salesOrderItemList = this.formGroup.value.salesOrderItemList.slice();
        }

    }

    calculateTotal() {
        let amount = 0;
        let quantity = 0;
        for (let i = 0; i < this.formGroup.value.salesOrderItemList.length; i++) {
            let salesOrderItem = this.formGroup.value.salesOrderItemList[i];
            salesOrderItem.amount = salesOrderItem.quantity * salesOrderItem.unitPrice;
            amount += salesOrderItem.amount;
            quantity += parseInt(salesOrderItem.quantity);
        }
        this.formGroup.value.amount = amount;
        this.formGroup.value.quantity = quantity;
    }

    /*================== Customer Item Filter ===================*/
    filteredCustomerItems: any[];

    filterCustomerItems(event) {
        let query = event.query.toLowerCase();
        this.filteredCustomerItems = [];
        for (let i = 0; i < this.customerItemList.length; i++) {
            let customerItem = this.customerItemList[i];
            if (customerItem.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredCustomerItems.push(customerItem);

            }
        }
    }
    onCustomerItemSelect(event: any) {
    }
    /*================== End Of Customer Item Filter ===================*/
    /*================== Sales Order Type Filter ===================*/
    filteredSalesOrderTypes: any[];

    filterSalesOrderTypes(event) {
        let query = event.query.toLowerCase();
        this.filteredSalesOrderTypes = [];
        for (let i = 0; i < this.salesOrderTypeList.length; i++) {
            let salesOrderType = this.salesOrderTypeList[i];
            if (salesOrderType.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredSalesOrderTypes.push(salesOrderType);
            }
        }
    }

    onSalesOrderTypeSelect(event: any) {
    }

    /*================== End Of Sales Order Type Filter ===================*/
    /*================== CustomerFilter ===================*/
    filteredCustomerList: any[];

    filterCustomerList(event) {
        let query = event.query.toLowerCase();
        this.filteredCustomerList = [];
        for (let i = 0; i < this.customerList.length; i++) {
            let customer = this.customerList[i];
            if (customer.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredCustomerList.push(customer);
            }
        }
    }

    onCustomerSelect(event: any) {
        this.getCustomerItemList();
    }

}



