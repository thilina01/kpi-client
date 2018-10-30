import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {FormGroup, AbstractControl,FormBuilder,Validators} from '@angular/forms';
import { SharedService } from '../../../../services/shared.service';
import { DispatchNoteService } from '../../dispatchNote.service';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { LoadingPlanService } from '../../../loadingPlan/loadingPlan.service';
import { CustomerService } from '../../../customer/customer.service';
import { AddressService } from '../../../../services/address.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'dispatch-note-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dispatchNoteForm.scss'],
  templateUrl: './dispatchNoteForm.html'
})
export class DispatchNoteForm {
  @Input('formGroup') public formGroup: FormGroup;
  @ViewChild(DataTable) dataTable: DataTable;
  public FormGroup: FormGroup;
  subscription: Subscription;
  loadingPlanItemList = [];
  loadingPlan: Array<any>;
  dispatchNote: any = {};
  loadingPlanList = [];
  totalQuantity = 0.0;
  dispatchDate: Date;
  customerList = [];
  employeeList = [];
  loadingPlans: any;
  addressList = [];
  JSON: any = JSON;
  totalRecords = 0;
  customer: any;
  employee: any;
  address: any;

  constructor(protected service: DispatchNoteService,
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private addressService: AddressService,
    private customerService: CustomerService,
    private loadingPlanService: LoadingPlanService,
    private confirmationService: ConfirmationService){
    this.formGroup = fb.group({
      id: '',
      loadingPlanList: [[]],
      invoice: [],
      customer: [this.customer, Validators.required],
    });
  }

  getCustomerList(): void {
    this.customerService.getCombo().subscribe(customerList => (this.customerList = customerList));
  }

  getLoadingPlanListByCustomer(id: number): void {
    this.loadingPlanService.getComboByCustomer(id).subscribe(loadingPlans => (this.loadingPlans = loadingPlans));
  }

  refresh(): void {
    this.getCustomerList();
  }

  ngOnInit(): void {
    this.getCustomerList();
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      id = id === undefined ? '0' : id;
      if (id !== '0') {
        this.service.get(+id).take(1).subscribe(data => {
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
    this.loadingPlan = this.dispatchNote.loadingPlan;
    this.setDisplayOfCustomer(this.dispatchNote.customer);
    this.setDisplayOfLoadingPlan();
    this.fillTable();
  }

  public onSubmit(values: any, event: Event): void {
    event.preventDefault();
    values = this.formGroup.value;
    if (values.loadingPlanList === null || values.loadingPlanList.length === 0) {
      alert('loading Plan Required');
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
    this.totalQuantity = 0.0;
    this.selectedLoadingPlan = '';
    this.loadingPlanItemList = [];
    this.loadingPlanItemList = this.loadingPlanItemList.slice();
  }

  public onEnter() {
    if (this.formGroup.value.loadingPlanList === null) {
      this.formGroup.value.loadingPlanList = [];
    }
    for (let i = 0; i < this.formGroup.value.loadingPlanList.length; i++) {
      if ( this.formGroup.value.loadingPlanList[i].id === this.selectedLoadingPlan.id) {
        alert('Already Added');
        return;
      }
    }
    this.formGroup.value.loadingPlanList.push(this.selectedLoadingPlan);
    this.fillTable();
  }

  public fillTable() {
    this.loadingPlanItemList = [];
    this.totalQuantity = 0.0;

    for (let i = 0; i < this.formGroup.value.loadingPlanList.length; i++) {
      let loadingPlan = this.formGroup.value.loadingPlanList[i];
      let xLoadingPlanItemList = loadingPlan.loadingPlanItemList;

      for (let ii = 0; ii < xLoadingPlanItemList.length; ii++) {
        let xLoadingPlanItem = xLoadingPlanItemList[ii];
        xLoadingPlanItem.loadingPlanId = loadingPlan.id;
        this.totalQuantity += xLoadingPlanItem.quantity;
        this.loadingPlanItemList.push(xLoadingPlanItem);
      }
    }
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
    this.resetForm();
    this.formGroup.patchValue({customer: customer}, { onlySelf: true });
    this.setDisplayOfCustomer(customer);
    this.getLoadingPlanListByCustomer(+customer.id);
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

  /*================== Loading Plan Filter ===================*/
  filteredLoadingPlans: any[];
  selectedLoadingPlan: any;
  filterLoadingPlans(event) {
    let query = event.query.toLowerCase();
    this.filteredLoadingPlans = [];
    for (let i = 0; i < this.loadingPlans.length; i++) {
      let loadingPlan = this.loadingPlans[i];
      if (loadingPlan.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredLoadingPlans.push(loadingPlan);
      }
    }
  }

  onLoadingPlanSelect(event: any) {
    this.setDisplayOfLoadingPlan();
  }
  setDisplayOfLoadingPlan() {
    let loadingPlan = this.formGroup.value.loadingPlan;
    if (loadingPlan != null && loadingPlan !== undefined) {
      let display =
        loadingPlan.code != null && loadingPlan.code !== undefined
          ? loadingPlan.code + ' : '
          : '';
      display +=
        loadingPlan.name != null && loadingPlan.name !== undefined
          ? loadingPlan.name
          : '';
      this.formGroup.value.loadingPlan.display = display;
    }
  }
  /*================== End Of Loading Plan Filter ===================*/
}
