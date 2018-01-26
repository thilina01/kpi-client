import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { InvoiceService } from '../../invoice.service';
import { InvoiceTypeService } from '../../../invoiceType/invoiceType.service';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { DispatchService } from '../../../../services/dispatch.service';
import 'rxjs/add/operator/take';
import { PackingListService } from '../../../packingList/packingList.service';

@Component({
    selector: 'invoice-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./invoiceForm.scss'],
    templateUrl: './invoiceForm.html',
})
export class InvoiceForm {
    public formGroup: FormGroup;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    subscription: Subscription;
    rows = [];
    invoice: any;
    JSON: any = JSON;
    totalRecords = 0;
    invoiceType: any;
    packingList: any;
    invoiceTypes: any;
    invoiceDate: Date;
    dispatchList = [];
    packingListList = [];

    constructor(protected service: InvoiceService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private invoiceTypeService: InvoiceTypeService,
        private packingListService: PackingListService,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            invoiceNumber: ['', Validators.required],
            invoiceDate: [this.invoiceDate, Validators.required],
            invoiceType: [this.invoiceType, Validators.required],
            packingList: [this.packingList, Validators.required]
        });
    }
    getInvoiceTypes(): void {
        this.invoiceTypeService.getAll().subscribe(invoiceTypes => this.invoiceTypes = invoiceTypes);
    }
    getPackingListList(): void {
        this.packingListService.getCombo().subscribe(packingListList => this.packingListList = packingListList);
    }

    ngOnInit(): void {
        this.getInvoiceTypes();
        this.getPackingListList();
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
        this.getInvoiceTypes();
        this.getPackingListList();

    }

    loadForm(data: any) {
        if (data != null) {
            data.invoiceDate = new Date(data.invoiceDate);
            this.packingList = data;
        }
        this.formGroup.patchValue(this.invoice, { onlySelf: true });
        this.invoiceType = this.invoice.invoiceType;
        this.setDisplayOfInvoiceType();
    }

    clear(): void {
        this.rows = [];
        this.totalRecords = 0;
        if (this.dataTableComponent != undefined) {
            this.dataTableComponent.reset();
        }
    }

    keyDown(event) {
        if (event.keyCode == 13) {
            this.clear();
            let id;
            this.fill(id);
        }
    }

    onFillButtonClick() {

        let id = this.formGroup.value.packingList.id;
        console.log(id);
        this.fill(id);
        this.fillDispatcList();

    }

    fill(id: any): void {
        this.clear();
        if (id != '0') {
            this.packingListService.get(+id).subscribe(
                (data) => {
                    console.log(data);
                }
            )
        }
    }

    fillDispatcList(): any {
        this.dispatchList = [];
        this.formGroup.value.packingListList.forEach(item => {
            this.dispatchList = this.dispatchList.concat(item.packingList.dispatchList);
        });
        this.dispatchList = this.dispatchList.slice();
    }

    public resetForm() {
        this.formGroup.reset();
        this.dispatchList = [];
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        values.invoiceDate = new Date();
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/invoice/form/']);
            }
        );
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
    /*==================  PackingList Filter ===================*/

    filteredPackingListList: any[];

    filterPackingListList(event) {
        let query = event.query.toLowerCase();
        this.filteredPackingListList = [];
        for (let i = 0; i < this.packingListList.length; i++) {
            let packingList = this.packingListList[i];
            if (packingList.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredPackingListList.push(packingList);
            }
        }
    }

    onPackingListSelect(event: any) {
        this.fill(this.packingList.id);
    }
    /*================== End Of PackingList Filter ===================*/
}