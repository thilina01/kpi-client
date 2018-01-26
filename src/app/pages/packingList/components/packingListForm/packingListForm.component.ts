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
import { DispatchNoteService } from '../../../dispatchNote/dispatchNote.service';
import { EmployeeService } from '../../../employee/employee.service';
import 'rxjs/add/operator/take';
import { CustomerService } from '../../../customer/customer.service';
import { AddressService } from '../../../../services/address.service';

@Component({
    selector: 'packing-list-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./packingListForm.scss'],
    templateUrl: './packingListForm.html',
})
export class PackingListForm {

    public formGroup: FormGroup;
    @ViewChild(DataTable) dataTable: DataTable;
    public dispatchNoteFormGroup: FormGroup;
    JSON: any = JSON;
    totalRecords: number;
    rows = [];
    packingList: any = {};
    packingListType: any;
    containerSizes: any;
    employee: any;
    address: any;
    customer: any;
    containerSize: any;
    dispatchNotes: any;
    dispatchNote: any = {};
    countries: any;
    country: any;
    ports: any;
    port: any;
    dispatchList = [];
    dispatchNoteList = [];
    addressList = [];
    customerList = [];
    employeeList = [];

    constructor(protected service: PackingListService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private dispatchNoteService: DispatchNoteService,
        private portService: PortService,
        private countryService: CountryService,
        private containerSizeService: ContainerSizeService,
        private dispatchService: DispatchService,
        private employeeService: EmployeeService,
        private customerService: CustomerService,
        private addressService: AddressService,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            noOfContainers: ['', Validators.required],
            employee: [this.employee, Validators.required],
            port: [this.port, Validators.required],
            portOfLoading: [this.port, Validators.required],
            country: [this.country, Validators.required],
            containerSize: [this.containerSize, Validators.required],
            netWeight: ['', Validators.required],
            grossWeight: ['', Validators.required],
            cubicMeter: ['', Validators.required],
            numberOfPackage: ['', Validators.required],
            customer: [this.customer, Validators.required],
            address: [this.address, Validators.required],
            dispatchNoteList: [[]],
        });

        this.dispatchNoteFormGroup = fb.group({
            dispatchNote: [{}, Validators.compose([Validators.required])],
        });
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
    getAddressListByCustomer(id: number): void {
        this.addressService.getComboByCustomer(id).subscribe(addressList => (this.addressList = addressList));
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
    getEmployeeList(): void {
        this.employeeService.getCombo().subscribe(employeeList => this.employeeList = employeeList);
    }

    ngOnInit(): void {
        this.getPorts();
        this.getCountries();
        this.getContainerSizes();
        this.getEmployeeList();
        this.getCustomerList();
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
        this.getPorts();
        this.getCountries();
        this.getContainerSizes();
        this.getEmployeeList();

    }

    loadForm(data: any) {
        (data) => {
            if (data != null) {
                this.packingList = data;
                this.dispatchNote = {};
            }
            this.formGroup.patchValue(this.packingList, { onlySelf: true });
            this.setDisplayOfCustomer();
            this.setDisplayOfDispatchNote();
            this.setDisplayOfAddress();
            this.fillDispatcList();
        }
    }

    fillDispatchNotes(): void {
        this.formGroup.value.dispatchNoteList = this.formGroup.value.dispatchNoteList.slice();
        this.dataTable.reset();
    }

    fillDispatcList(): any {
        this.dispatchList = [];
        this.formGroup.value.dispatchNoteList.forEach(item => {
            this.dispatchList = this.dispatchList.concat(item.dispatchNote.dispatchList);
        });
        this.dispatchList = this.dispatchList.slice();
    }

     public onEnter() {
        if (this.dispatchNoteFormGroup.valid) {
            let values = this.dispatchNoteFormGroup.value;
            if (this.formGroup.value.dispatchNoteList == null) {
                this.formGroup.value.dispatchNoteList = [];
            }

            this.dispatchNoteService.get(+values.dispatchNote.id).subscribe(dispatchNote => {
                values.dispatchNote = dispatchNote;
                this.formGroup.value.dispatchNoteList.push(values);
                this.dispatchNoteFormGroup.reset();
                document.getElementById('dispatchNoteSelector').focus();
                this.formGroup.value.dispatchNoteList = this.formGroup.value.dispatchNoteList.slice();
                this.fillDispatcList();
                console.log(this.dispatchList);
            });

        }
    }

    public onSubmit(values: any, event: Event): void {

        if (values.dispatchNoteList === null || values.dispatchNoteList.length === 0) {
            alert('dispatchNote Required');
            return;
        }

        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/packingList/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
        this.dispatchNoteFormGroup.reset();
        this.dispatchList = [];

    }

    /*================== Port Filter ===================*/
    filteredPorts: any[];

    filterPorts(event) {
        let query = event.query.toLowerCase();
        this.filteredPorts = [];
        for (let port of this.ports) {
            if (port.display.toLowerCase().indexOf(query) >= 0) {
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
            if (country.display.toLowerCase().indexOf(query) >= 0) {
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
            if (containerSize.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredContainerSizes.push(containerSize);
            }
        }
    }
    /*================== End Of ContainerSize Filter ===================*/
    /*================== EmployeeFilter ===================*/
    filteredEmployeeList: any[];

    filterEmployeeList(event) {
        let query = event.query.toLowerCase();
        this.filteredEmployeeList = [];
        for (let i = 0; i < this.employeeList.length; i++) {
            let employee = this.employeeList[i];
            if (employee.display.toLowerCase().indexOf(query) >= 0) {
                this.filteredEmployeeList.push(employee);
            }
        }
    }

    /*================== End Of Employee Filter ===================*/
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
        this.getAddressListByCustomer(+customer.id);

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
    /*================== AddressFilter ===================*/
    filteredAddressList: any[];

    filterAddressList(event) {
        let query = event.query.toLowerCase();
        this.filteredAddressList = [];
        for (let i = 0; i < this.addressList.length; i++) {
            let address = this.addressList[i];
            if (
                address.code.toLowerCase().indexOf(query) == 0 ||
                address.name.toLowerCase().indexOf(query) == 0
            ) {
                this.filteredAddressList.push(address);
            }
        }
    }

    handleAddressDropdownClick() {
        this.filteredAddressList = [];
        setTimeout(() => {
            this.filteredAddressList = this.addressList;
        }, 100);
    }

    onAddressSelect(event: any) {
        this.setDisplayOfAddress();
    }

    setDisplayOfAddress() {
        let address = this.formGroup.value.address;
        if (address != null && address != undefined) {
            let display =
                address.code != null && address.code != undefined
                    ? address.code + ' : '
                    : '';
            display +=
                address.name != null && address.name != undefined ? address.name : '';
            this.formGroup.value.address.display = display;
        }
    }

    /*================== End Of DispatchNote Filter ===================*/
}











