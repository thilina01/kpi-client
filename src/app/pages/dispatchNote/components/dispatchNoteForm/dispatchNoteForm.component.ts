import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators
} from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { DispatchNoteService } from '../../dispatchNote.service';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { DispatchScheduleService } from '../../../dispatchSchedule/dispatchSchedule.service';
import { EmployeeService } from '../../../employee/employee.service';
import { CustomerService } from '../../../customer/customer.service';
import { AddressService } from '../../../../services/address.service';
import 'rxjs/add/operator/take';
import { DispatchService } from '../../../../services/dispatch.service';

@Component({
  selector: 'dispatch-note-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dispatchNoteForm.scss'],
  templateUrl: './dispatchNoteForm.html'
})
export class DispatchNoteForm {
  fillDispatchNotes(): any {
    throw new Error('Method not implemented.');
  }
  @Input('formGroup') public formGroup: FormGroup;
  @ViewChild(DataTable) dataTable: DataTable;
  public dispatchFormGroup: FormGroup;

  totalRecords = 0;
  dispatchSchedule: Array<any>;
  dispatchDate: Date;
  employee: any;
  address: any;
  customer: any;

  JSON: any = JSON;

  public FormGroup: FormGroup;
  dispatchNote: any = {};
  subscription: Subscription;

  dispatchList = [];
  customerList = [];
  dispatchScheduleList = [];
  employeeList = [];
  addressList = [];

  constructor(
    protected service: DispatchNoteService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private addressService: AddressService,
    private employeeService: EmployeeService,
    private dispatchScheduleService: DispatchScheduleService,
    private dispatchService: DispatchService,
    private customerService: CustomerService,
    private sharedService: SharedService
  ) {
    this.formGroup = fb.group({
      id: '',
      quantity: 0,
      customer: [this.customer, Validators.required],
      address: [this.address, Validators.required],
      // employee: [this.employee, Validators.required],
      dispatchList: [[]]
    });

    this.dispatchFormGroup = fb.group({
      quantity: '',
      dispatchSchedule: [{}, Validators.compose([Validators.required])]
    });
  }

  getCustomerList(): void {
    this.customerService
      .getCombo()
      .subscribe(customerList => (this.customerList = customerList));
  }

  getaAddressListByCustomer(id: number): void {
    this.addressService
      .getComboByCustomer(id)
      .subscribe(addressList => (this.addressList = addressList));
  }

  getEmployeeList(): void {
    this.employeeService
      .getCombo()
      .subscribe(employeeList => (this.employeeList = employeeList));
  }

  getDispatchScheduleListByCustomer(id: number): void {
    this.dispatchScheduleService
      .getComboByCustomer(id)
      .subscribe(
        dispatchScheduleList =>
          (this.dispatchScheduleList = dispatchScheduleList)
      );
  }

  refresh(): void {
    this.getCustomerList();
    this.getEmployeeList();
  }

  fillDispatchs(): void {
    this.formGroup.value.dispatchList = this.formGroup.value.dispatchList.slice();
    this.dataTable.reset();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.refresh();
    }, 500);
    this.getCustomerList();
    this.getEmployeeList();
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      id = id == undefined ? '0' : id;
      if (id != '0') {
        this.service
          .get(+id)
          .take(1)
          .subscribe(data => {
            this.loadForm(data);
          });
      }
    });
  }

  loadForm(data: any) {
    if (data != null) {
      data.dispatchDate = new Date(data.dispatchDate);
      this.dispatchNote = data;
    }
    this.formGroup.patchValue(this.dispatchNote, { onlySelf: true });
    this.customer = this.dispatchNote.customer;
    this.address = this.dispatchNote.address;
    this.employee = this.dispatchNote.employee;
    this.dispatchSchedule = this.dispatchNote.dispatchSchedule;
    this.setDisplayOfCustomer(this.dispatchNote.customer);
    this.setDisplayOfEmployee();
    this.setDisplayOfAddress();
    this.setDisplayOfDispatchSchedule();
    this.calculateTotal();
  }

  public onSubmit(values: any, event: Event): void {
    event.preventDefault();
    console.log(values);
    if (values.dispatchList === null || values.dispatchList.length === 0) {
      alert('dispatch Required');
      return;
    }
    values.dispatchDate = new Date();
    this.service.save(values).subscribe(data => {
      this.sharedService.addMessage({
        severity: 'info',
        summary: 'Success',
        detail: 'Operation Success'
      });
      this.resetForm();
      this.router.navigate(['/pages/dispatchNote/form/']);
    });
  }

  public resetForm() {
    this.formGroup.reset();
    this.dispatchFormGroup.reset();
  }

  public removeDispatch(id: number, dispatch: any) {
    if (this.formGroup.value.dispatchList != null) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to Delete?',
        accept: () => {
          if (dispatch.id){
            this.dispatchService.delete(dispatch.id).subscribe(response => {
              this.sharedService.addMessage({
                severity: 'info',
                summary: 'Deleted',
                detail: 'Delete success'
              });
            });
        }
          this.formGroup.value.dispatchList.splice(id, 1);
            this.fillDispatchs();
            this.calculateTotal();
        }
      });
    }
  }

  public onEnter(quantity: string, dt: DataTable) {
    if (this.dispatchFormGroup.valid) {
      let values = this.dispatchFormGroup.value;
      if (this.formGroup.value.dispatchList == null) {
        this.formGroup.value.dispatchList = [];
      }

      this.dispatchScheduleService
        .get(+values.dispatchSchedule.id)
        .subscribe(dispatchSchedule => {
          values.dispatchSchedule = dispatchSchedule;
          this.formGroup.value.dispatchList.push(values);
          this.calculateTotal();
          this.dispatchFormGroup.reset();
          document.getElementById('dispatchScheduleSelector').focus();
          this.formGroup.value.dispatchList = this.formGroup.value.dispatchList.slice();
        });
    }
  }

  calculateTotal() {
    let quantity = 0;
    for (let i = 0; i < this.formGroup.value.dispatchList.length; i++) {
      let dispatch = this.formGroup.value.dispatchList[i];
      quantity += parseInt(dispatch.quantity);
    }
    this.formGroup.value.quantity = quantity;
  }
  /*================== CustomerFilter ===================*/
  filteredCustomerList: any[];

  filterCustomerList(event) {
    let query = event.query.toLowerCase();
    this.filteredCustomerList = [];
    for (let i = 0; i < this.customerList.length; i++) {
      let customer = this.customerList[i];
      if (
        customer.code.toLowerCase().indexOf(query) == 0 ||
        customer.name.toLowerCase().indexOf(query) == 0
      ) {
        this.filteredCustomerList.push(customer);
      }
    }
  }

  handleCustomerDropdownClick() {
    this.filteredCustomerList = [];
    //mimic remote call
    setTimeout(() => {
      this.filteredCustomerList = this.customerList;
    }, 100);
  }

  onCustomerSelect(event: any) {
    let customer = this.formGroup.value.customer;
    this.setDisplayOfCustomer(customer);
    this.getDispatchScheduleListByCustomer(+customer.id);
    this.getaAddressListByCustomer(+customer.id);
  }

  setDisplayOfCustomer(customer: any) {
    if (customer != null && customer != undefined) {
      let display =
        customer.code != null && customer.code != undefined
          ? customer.code + ' : '
          : '';
      display +=
        customer.name != null && customer.name != undefined
          ? customer.name
          : '';
      this.formGroup.value.customer.display = display;
    }
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
    //mimic remote call
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

  /*================== EmployeeFilter ===================*/
  filteredEmployeeList: any[];

  filterEmployeeList(event) {
    let query = event.query.toLowerCase();
    this.filteredEmployeeList = [];
    for (let i = 0; i < this.employeeList.length; i++) {
      let employee = this.employeeList[i];
      if (
        employee.code.toLowerCase().indexOf(query) == 0 ||
        employee.firstName.toLowerCase().indexOf(query) == 0
      ) {
        this.filteredEmployeeList.push(employee);
      }
    }
  }

  handleEmployeeDropdownClick() {
    this.filteredEmployeeList = [];
    //mimic remote call
    setTimeout(() => {
      this.filteredEmployeeList = this.employeeList;
    }, 100);
  }

  onEmployeeSelect(event: any) {
    this.setDisplayOfEmployee();
  }

  setDisplayOfEmployee() {
    let employee = this.formGroup.value.employee;
    if (employee != null && employee != undefined) {
      let display =
        employee.code != null && employee.code != undefined
          ? employee.code + ' : '
          : '';
      display +=
        employee.fullName != null && employee.fullName != undefined
          ? employee.fullName
          : '';
      this.formGroup.value.employee.display = display;
    }
  }

  /*================== DispatchScheduleFilter ===================*/
  filteredDispatchScheduleList: any[];

  filterDispatchScheduleList(event) {
    let query = event.query.toLowerCase();
    this.filteredDispatchScheduleList = [];
    for (let i = 0; i < this.dispatchScheduleList.length; i++) {
      let dispatchSchedule = this.dispatchScheduleList[i];
      if (
        dispatchSchedule.code.toLowerCase().indexOf(query) == 0 ||
        dispatchSchedule.name.toLowerCase().indexOf(query) == 0
      ) {
        this.filteredDispatchScheduleList.push(dispatchSchedule);
      }
    }
  }

  handleDispatchScheduleDropdownClick() {
    this.filteredDispatchScheduleList = [];
    //mimic remote call
    setTimeout(() => {
      this.filteredDispatchScheduleList = this.dispatchScheduleList;
    }, 100);
  }

  onDispatchScheduleSelect(event: any) {
    this.setDisplayOfDispatchSchedule();
  }

  setDisplayOfDispatchSchedule() {
    let dispatchSchedule = this.dispatchFormGroup.value.dispatchSchedule;
    if (dispatchSchedule != null && dispatchSchedule != undefined) {
      let display =
        dispatchSchedule.code != null && dispatchSchedule.code != undefined
          ? dispatchSchedule.code + ' : '
          : '';
      display +=
        dispatchSchedule.name != null && dispatchSchedule.name != undefined
          ? dispatchSchedule.name
          : '';
      this.dispatchFormGroup.value.dispatchSchedule.display = display;
    }
  }
}
