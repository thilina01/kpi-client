import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { PackingListService } from '../../packingList.service';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { DispatchService } from '../../../../services/dispatch.service';
import { PortService } from '../../../port/port.service';
import { CountryService } from '../../../country/country.service';
import { ContainerSizeService } from '../../../containerSize/containerSize.service';
import { InvoiceService } from '../../../invoice/invoice.service';

@Component({
    selector: 'packing-list-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./packingListForm.scss'],
    templateUrl: './packingListForm.html',
})
export class PackingListForm {
    public formGroup: FormGroup;
    @ViewChild(DataTable) dataTable: DataTable;
    public invoiceFormGroup: FormGroup;
    subscription: Subscription;
    JSON: any = JSON;
    totalRecords = 0;
    rows = [];
    packingList: any;
    packingListType: any;
    containerSizes: any;
    containerSize: any;
    invoices: any;
    invoice: any;
    countries: any;
    country: any;
    ports: any;
    port: any;
    dispatchList = [];
    invoiceList = [];

    constructor(protected service: PackingListService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private invoiceService: InvoiceService,
        private portService: PortService,
        private countryService: CountryService,
        private containerSizeService: ContainerSizeService,
        private dispatchService: DispatchService,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            netWeight: 0,
            grossWeight: 0,
            cbm: 0,
            pkgs: 0,
            noOfContainers: ['', Validators.required],
            contactPerson: ['', Validators.required],
            port: [this.port, Validators.required],
            country: [this.country, Validators.required],
            containerSize: [this.containerSize, Validators.required],
            invoiceList: [[]],
        });
        this.invoiceFormGroup = fb.group({
            invoice: [{}, Validators.compose([Validators.required])],
            netWeight: ['', Validators.required],
            grossWeight: ['', Validators.required],
            cbm: ['', Validators.required],
            pkgs: ['', Validators.required]
        });
    }

    getPorts(): void {
        this.portService.getCombo().subscribe(ports => this.ports = ports);
    }
    getCountries(): void {
        this.countryService.getCombo().subscribe(countries => this.countries = countries);
    }
    getContainerSizes(): void {
        this.containerSizeService.getCombo().subscribe(containerSizes => this.containerSizes = containerSizes);
    }
    getInvoices(): void {
        this.invoiceService.getCombo().subscribe(invoices => this.invoices = invoices);
    }

    ngOnInit(): void {
        this.getPorts();
        this.getCountries();
        this.getContainerSizes();
        this.getInvoices();
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.get(+id).subscribe(
                        (data) => {
                            this.loadForm(data);
                        }
                    )
                }
            }
        );
    }

    refresh(): void {
        this.getPorts();
        this.getCountries();
        this.getContainerSizes();
        this.getInvoices();
    }

    loadForm(data: any) {
        if (data != null) {
            this.packingList = data;
        }
        this.formGroup.patchValue(this.packingList, { onlySelf: true });
        this.packingListType = this.packingList.packingListType;
        this.port = this.packingList.port;
        this.country = this.packingList.country;
        this.containerSize = this.packingList.containerSize;
        this.invoice = this.packingList.invoice;
        this.calculateTotal();

    }
    public resetForm() {
        this.formGroup.reset();
        this.invoiceFormGroup.reset();
    }

    fillInvoices(): void {
        this.formGroup.value.invoiceList = this.formGroup.value.invoiceList.slice();
        this.dataTable.reset();

    }
    public onEnter(cbm: string, dt: DataTable) {
        if (this.invoiceFormGroup.valid) {
            let values = this.invoiceFormGroup.value;
            if (this.formGroup.value.invoiceList == null) {
                this.formGroup.value.invoiceList = [];
            }

            this.invoiceService.get(+values.invoice.id).subscribe(invoice => {
                values.invoice = invoice;
                this.formGroup.value.invoiceList.push(values);
                this.calculateTotal();
                this.invoiceFormGroup.reset();
                document.getElementById('invoiceSelector').focus();
                this.formGroup.value.invoiceList = this.formGroup.value.invoiceList.slice();
            });

        }

    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        if (values.invoiceList === null || values.invoiceList.length === 0) {
            alert('invoiceForm Required');
            return;
        }
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/packingList/form/']);
            }
        );
    }

    public removeInvoice(id: number) {
        if (this.formGroup.value.invoiceList != null) {
            this.confirmationService.confirm({
                message: 'Are you sure that you want to Delete?',
                accept: () => {
                    this.formGroup.value.invoiceList.splice(id, 1);
                    this.fillInvoices();
                    this.calculateTotal();
                }
            });
        }
    }

    calculateTotal() {
        let netWeight = 0;
        let grossWeight = 0;
        let cbm = 0;
        let pkgs = 0;
        for (let i = 0; i < this.formGroup.value.invoiceList.length; i++) {
            let invoice = this.formGroup.value.invoiceList[i];
            netWeight += parseInt(invoice.netWeight);
            grossWeight += parseInt(invoice.grossWeight);
            cbm += parseInt(invoice.cbm);
            pkgs += parseInt(invoice.pkgs);
        }
        this.formGroup.value.netWeight = netWeight;
        this.formGroup.value.grossWeight = grossWeight;
        this.formGroup.value.cbm = cbm;
        this.formGroup.value.pkgs = pkgs;
    }
    
    /*================== Port Filter ===================*/
    filteredPorts: any[];

    filterPorts(event) {
        let query = event.query.toLowerCase();
        this.filteredPorts = [];
        for (let port of this.ports) {
            if (port.code.toLowerCase().indexOf(query) == 0 || port.name.toLowerCase().indexOf(query) == 0) {
                this.filteredPorts.push(port);
            }
        }
    }
    /*================== End Of Port Filter ===================*/
    /*================== Country Filter ===================*/
    filteredCountries: any[];

    filterCountries(event) {
        let query = event.query.toLowerCase();
        this.filteredCountries = [];
        for (let country of this.countries) {
            if (country.code.toLowerCase().indexOf(query) == 0 || country.name.toLowerCase().indexOf(query) == 0) {
                this.filteredCountries.push(country);
            }
        }
    }
    /*================== End Of Country Filter ===================*/
    /*================== ContainerSize Filter ===================*/
    filteredContainerSizes: any[];

    filterContainerSizes(event) {
        let query = event.query.toLowerCase();
        this.filteredContainerSizes = [];
        for (let containerSize of this.containerSizes) {
            if (containerSize.code.toLowerCase().indexOf(query) == 0 || containerSize.name.toLowerCase().indexOf(query) == 0) {
                this.filteredContainerSizes.push(containerSize);
            }
        }
    }
    /*================== End Of ContainerSize Filter ===================*/
    /*================== InvoiceFilter ===================*/
    filteredInvoiceList: any[];

    filterInvoiceList(event) {
        let query = event.query.toLowerCase();
        this.filteredInvoiceList = [];
        for (let i = 0; i < this.invoiceList.length; i++) {
            let invoice = this.invoiceList[i];
            if (invoice.id.toLowerCase().indexOf(query) == 0) {
                this.filteredInvoiceList.push(invoice);
            }
        }
    }

    setDisplayOfInvoice() {
        let invoice = this.invoiceFormGroup.value.invoice;
        if (invoice != null && invoice != undefined) {
            let display = invoice.id != null && invoice.id != undefined ? invoice.id + ' : ' : '';
            this.invoiceFormGroup.value.invoice.display = display;
        }
    }
}


