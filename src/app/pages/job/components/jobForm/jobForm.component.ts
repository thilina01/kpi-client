import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ItemService } from "../../../item/item.service";
import { JobService } from "../../job.service";
import { JobTypeService } from "../../../jobType/jobType.service";
import { CustomerItemService } from "../../../customerItem/customerItem.service";
import { CustomerPoNumberService } from "../../../customerPoNumber/customerPoNumber.service";
import { SalesOrderService } from "../../../salesOrder/salesOrder.service";

@Component({
    selector: 'job-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./jobForm.scss'],
    templateUrl: './jobForm.html',
})
export class JobForm {
    salesOrder: any;
    salesOrders: any;
    customerPoNumber: any;
    customerPoNumbers: any;
    salesOrderTypes: any;
    salesOrderType: any;
    salesOrderItem: any;
    customerItems: any;
    customerItem: any;
    poNumber: any;
    JSON: any = JSON;

    public formGroup: FormGroup;
    job: any = {};
    jobList: Array<any> = [];
    subscription: Subscription;

    jobTypes: any;
    items: any;

    jobDate: Date;
    confirmDate: Date;
    requestDate: Date;
    jobTime: Date = new Date();
    recoveryTime: Date = new Date();
    jobType: any = { id: '', code: '', type: '' }
    item: any = { id: '', code: '', description: '' }

    constructor(protected service: JobService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService,
        private jobTypeService: JobTypeService,
        private customerItemService: CustomerItemService,
        private salesOrderService: SalesOrderService,

        private itemService: ItemService) {

        this.formGroup = fb.group({
            id: '',
            jobNo: ['', Validators.required],
            jobDate: [this.jobDate, Validators.required],
            quantity: ['', Validators.required],
            jobType: [this.jobType, Validators.required],
            confirmDate: '',
            requestDate: [this.requestDate, Validators.required],
            item: [{}, Validators.required],
            salesOrderItem: [{}, Validators.required]
        });
    }

    getJobTypes(): void {
        this.jobTypeService.getCombo().subscribe(jobTypes => this.jobTypes = jobTypes);
    }

    getCustomerItems(): void {
        this.customerItemService.getCombo().subscribe(customerItems => this.customerItems = customerItems);
    }

    getSalesOrders(): void {
        this.salesOrderService.getCombo().subscribe(salesOrders => this.salesOrders = salesOrders);
    }

    ngOnInit(): void {
        this.getJobTypes();
        this.getCustomerItems();
        this.getSalesOrders();
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
            this.job = data;
        }
        this.formGroup.patchValue(this.job, { onlySelf: true });
        this.jobType = this.job.jobType;
        this.customerItem = this.job.customerItem;
        this.salesOrder = this.job.salesOrder;
        this.setDisplayOfJobType();
        this.setDisplayOfCustomerItem();
        this.setDisplayOfSalesOrder();

    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        if ((values.salesOrderItem.allocated + values.quantity) <= values.salesOrderItem.quantity ) {
            this.service.save(values).subscribe(
                (data) => {
                    this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                    this.resetForm();
                    this.display = false;
                    this.onSalesOrderSelect(this.salesOrder);
                    //this.router.navigate(['/pages/job/form/']);
                }
            );
        }else{
            alert("invalid quantity");
        }
    }

    public resetForm() {
        this.formGroup.reset();
    }

    display: boolean = false;

    showDialog(data: any) {
        console.log(data);
        this.job = {
            item: data.customerItem.item,
            quantity: (data.quantity-data.allocated),
            salesOrderItem: data
        };

        this.formGroup.patchValue(this.job, { onlySelf: true });
        this.display = true;
    }

    /*================== Job Type Filter ===================*/
    filteredJobTypes: any[];
    //jobType: any;

    filterJobTypes(event) {
        let query = event.query.toLowerCase();
        this.filteredJobTypes = [];
        for (let i = 0; i < this.jobTypes.length; i++) {
            let jobType = this.jobTypes[i];
            if (jobType.code.toLowerCase().indexOf(query) == 0 || jobType.name.toLowerCase().indexOf(query) == 0) {
                this.filteredJobTypes.push(jobType);
            }
        }
    }

    handleJobTypeDropdownClick() {
        this.filteredJobTypes = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredJobTypes = this.jobTypes;
        }, 100)
    }
    onJobTypeSelect(event: any) {
        this.setDisplayOfJobType();
    }

    setDisplayOfJobType() {
        let jobType = this.formGroup.value.jobType;
        if (jobType != null && jobType != undefined) {
            let display = jobType.code != null && jobType.code != undefined ? jobType.code + " : " : "";
            display += jobType.name != null && jobType.name != undefined ? jobType.name : "";
            this.formGroup.value.jobType.display = display;
        }
    }
    /*================== End Of Job Type Filter ===================*/

    /*================== Customer Item Filter ===================*/
    filteredCustomerItems: any[];
    //customerItem: any;

    filterCustomerItems(event) {
        let query = event.query.toLowerCase();
        this.filteredCustomerItems = [];
        for (let i = 0; i < this.customerItems.length; i++) {
            let customerItem = this.customerItems[i];
            if (customerItem.code.toLowerCase().indexOf(query) == 0 || customerItem.name.toLowerCase().indexOf(query) == 0) {
                this.filteredCustomerItems.push(customerItem);
            }
        }
    }

    handleCustomerItemDropdownClick() {
        this.filteredCustomerItems = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredCustomerItems = this.customerItems;
        }, 100)
    }
    onCustomerItemSelect(event: any) {
        this.setDisplayOfCustomerItem();
    }

    setDisplayOfCustomerItem() {
        let customerItem = this.formGroup.value.customerItem;
        if (customerItem != null && customerItem != undefined) {
            let display = customerItem.code != null && customerItem.code != undefined ? customerItem.code + " : " : "";
            display += customerItem.name != null && customerItem.name != undefined ? customerItem.name : "";
            this.formGroup.value.customerItem.display = display;
        }
    }
    /*================== End Of Customer Item Filter ===================*/

    /*================== Sales Order Filter ===================*/
    filteredSalesOrders: any[];
    //salesOrder: any;

    filterSalesOrders(event) {
        let query = event.query.toLowerCase();
        this.filteredSalesOrders = [];
        for (let i = 0; i < this.salesOrders.length; i++) {
            let salesOrder = this.salesOrders[i];
            if (salesOrder.code.toLowerCase().indexOf(query) == 0 || salesOrder.name.toLowerCase().indexOf(query) == 0) {
                this.filteredSalesOrders.push(salesOrder);
            }
        }
    }

    handleSalesOrderDropdownClick() {
        this.filteredSalesOrders = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredSalesOrders = this.salesOrders;
        }, 100)
    }

    onSalesOrderSelect(event: any) {
        this.salesOrderService.getOne(this.salesOrder.id).subscribe(
            (data) => {
                this.salesOrder = data;
                this.setDisplayOfSalesOrder();
            }
        )
        this.service.getBySalesOrder(this.salesOrder.id).subscribe(
            (data) => {
                this.jobList = data;
            }
        )
    }

    setDisplayOfSalesOrder() {
        if (this.salesOrder != null && this.salesOrder != undefined) {
            let display = this.salesOrder.code != null && this.salesOrder.code != undefined ? this.salesOrder.code + " : " : "";
            display += this.salesOrder.name != null && this.salesOrder.name != undefined ? this.salesOrder.name : "";
            this.salesOrder.display = display;
        }
    }
    /*================== End Of Sales Order Filter ===================*/
}
