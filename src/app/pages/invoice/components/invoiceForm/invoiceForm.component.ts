import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { InvoiceService } from '../../invoice.service';
import { InvoiceTypeService } from '../../../invoiceType/invoiceType.service';
import { CustomerService } from '../../../customer/customer.service';
import { DispatchNoteService } from '../../../dispatchNote/dispatchNote.service';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { DispatchService } from '../../../../services/dispatch.service';

@Component({
    selector: 'invoice-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./invoiceForm.scss'],
    templateUrl: './invoiceForm.html',
})
export class InvoiceForm {
    public formGroup: FormGroup;
    @ViewChild(DataTable) dataTable: DataTable;
    public dispatchNoteFormGroup: FormGroup;
    subscription: Subscription;
    JSON: any = JSON;
    totalRecords = 0;
    rows = [];
    invoice: any;
    customer: any;
    invoiceType: any;
    invoiceTypes: any;
    invoiceDate: Date;
    customerList = [];
    dispatchNote: any = {};
    dispatchList = [];
    dispatchNoteList = [];

    constructor(protected service: InvoiceService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private customerService: CustomerService,
        private dispatchNoteService: DispatchNoteService,
        private dispatchService: DispatchService,
        private invoiceTypeService: InvoiceTypeService,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            invoiceNumber: ['', Validators.required],
            invoiceDate: [this.invoiceDate, Validators.required],
            invoiceType: [this.invoiceType, Validators.required],
            customer: [this.customer, Validators.required],
            dispatchNoteList: [[]],
        });

        this.dispatchNoteFormGroup = fb.group({
            dispatchNote: [{}, Validators.compose([Validators.required])],
        });

    }
    getInvoiceTypes(): void {
        this.invoiceTypeService.getAll().subscribe(invoiceTypes => this.invoiceTypes = invoiceTypes);
    }
    getCustomerList(): void {
        this.customerService.getCombo().subscribe(customerList => {
            this.customerList = customerList;
            this.setDisplayOfCustomers();
        });
    }
    getDispatchNoteListByCustomer(id: number): void {
        this.dispatchNoteService.getComboByCustomer(id).subscribe(dispatchNoteList => {
            this.dispatchNoteList = dispatchNoteList;
            this.setDisplayOfDispatchNotes();
        });
    }

    ngOnInit(): void {
        this.getInvoiceTypes();
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

    refresh(): void {
        this.getCustomerList();
        this.getInvoiceTypes();
    }

    loadForm(data: any) {
        if (data != null) {
            data.invoiceDate = new Date(data.invoiceDate);
            this.invoice = data;
        }
        this.formGroup.patchValue(this.invoice, { onlySelf: true });
        this.invoiceType = this.invoice.invoiceType;
        this.customer = this.invoice.customer;
        this.dispatchNote = this.invoice.dispatchNote;
        this.setDisplayOfCustomer();
        this.setDisplayOfInvoiceType();
        this.setDisplayOfDispatchNote();
    }

    public resetForm() {
        this.formGroup.reset();
        this.dispatchNoteFormGroup.reset();
    }

    fillDispatchNotes(): void {
        this.formGroup.value.dispatchNoteList = this.formGroup.value.dispatchNoteList.slice();
        this.dataTable.reset();

    }
    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        if (values.dispatchNoteList === null || values.dispatchNoteList.length === 0) {
            alert('dispatchNote Required');
            return;
        }
        values.invoiceDate = new Date();
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/invoice/form/']);
            }
        );
    }   
    public removeDispatchNote(id: number) {
        if (this.formGroup.value.dispatchNote.dispatchList!= null) {
            this.confirmationService.confirm({
                message: 'Are you sure that you want to Delete?',
                accept: () => {
                    this.formGroup.value.dispatchNoteList.splice(id, 1);
                    this.fillDispatchNotes();
                }
            });
        }
    }
    public onEnter(dt: DataTable) {
        if (this.dispatchNoteFormGroup.valid) {
            let values = this.dispatchNoteFormGroup.value;
            if (this.formGroup.value.dispatchNoteList == null) {
                this.formGroup.value.dispatchNoteList = [];
            }

            this.dispatchNoteService.getOne(+values.dispatchNote.id).subscribe(dispatchNote => {
                values.dispatchNote = dispatchNote;
                this.formGroup.value.dispatchNoteList.push(values);
                this.dispatchNoteFormGroup.reset();
                document.getElementById('dispatchNoteSelector').focus();
                this.formGroup.value.dispatchNoteList = this.formGroup.value.dispatchNoteList.slice();
                this.dispatchList = [];
                this.formGroup.value.dispatchNoteList.forEach(item => {
                    let dispatchNote = item.dispatchNote;
                    console.log(dispatchNote);
                    console.log(dispatchNote.dispatchList);
                    this.dispatchList = this.dispatchList.concat(dispatchNote.dispatchList);
                });
                this.dispatchList = this.dispatchList.slice();
                console.log(this.dispatchList);
            });

        }

    }

    /*================== Invoice Type Filter ===================*/
    filteredInvoiceTypes: any[];

    filterInvoiceTypes(event) {
        let query = event.query.toLowerCase();
        this.filteredInvoiceTypes = [];
        for (let i = 0; i < this.invoiceTypes.length; i++) {
            let invoiceType = this.invoiceTypes[i];
            if (invoiceType.code.toLowerCase().indexOf(query) == 0 || invoiceType.name.toLowerCase().indexOf(query) == 0) {
                this.filteredInvoiceTypes.push(invoiceType);
            }
        }
    }

    onInvoiceTypeSelect(event: any) {
        this.setDisplayOfInvoiceType();
    }

    setDisplayOfInvoiceType() {
        let invoiceType = this.formGroup.value.invoiceType;
        if (invoiceType != null && invoiceType != undefined) {
            let display = invoiceType.code != null && invoiceType.code != undefined ? invoiceType.code + ' : ' : '';
            display += invoiceType.name != null && invoiceType.name != undefined ? invoiceType.name : '';
            this.formGroup.value.invoiceType.display = display;
        }
    }

    /*================== End Of Invoice Type Filter ===================*/
    /*================== Customer Filter ===================*/
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

    onCustomerSelect(event: any) {
        let customer = this.formGroup.value.customer;
        this.setDisplayOfCustomer();
        this.getDispatchNoteListByCustomer(+customer.id);

    }

    setDisplayOfCustomer() {
        let customer = this.formGroup.value.customer;
        if (customer != null && customer != undefined) {
            let display = customer.code != null && customer.code != undefined ? customer.code + ' : ' : '';
            display += customer.name != null && customer.name != undefined ? customer.name : '';
            this.formGroup.value.customer.display = display;
        }
    }

    setDisplayOfCustomers() {
        this.customerList.forEach(customer => {
            let display = customer.code != null && customer.code != undefined ? customer.code + ' : ' : '';
            display += customer.name != null && customer.name != undefined ? customer.name : '';
            customer.display = display;
        });
    }
    /*================== End Of Customer Filter ===================*/
    /*================== DispatchNote Filter ===================*/
    filteredDispatchNoteList: any[];

    filterDispatchNoteList(event) {
        let query = event.query.toLowerCase();
        this.filteredDispatchNoteList = [];
        for (let i = 0; i < this.dispatchNoteList.length; i++) {
            let dispatchNote = this.dispatchNoteList[i];
            if ((dispatchNote.id + '').indexOf(query) == 0) {
                this.filteredDispatchNoteList.push(dispatchNote);
            }
        }
    }

    onDispatchNoteSelect(event: any) {
        console.log(event);
        this.dispatchNoteFormGroup.value.dispatchNote = event;
        this.setDisplayOfDispatchNote();
    }

    setDisplayOfDispatchNote() {
        let dispatchNote = this.dispatchNoteFormGroup.value.dispatchNote;
        if (dispatchNote != null && dispatchNote != undefined) {
            let display = dispatchNote.id != null && dispatchNote.id != undefined ? dispatchNote.id : '';
            this.dispatchNoteFormGroup.value.dispatchNote.display = display;
        }
    }

    setDisplayOfDispatchNotes() {
        this.dispatchNoteList.forEach(dispatchNote => {
            let display = dispatchNote.id != null && dispatchNote.id != undefined ? dispatchNote.id : '';
            dispatchNote.display = display;
        });
    }
    /*================== End Of DispatchNote Filter ===================*/


}











