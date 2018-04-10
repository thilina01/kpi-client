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
import { LoadingPlanService } from '../../../loadingPlan/loadingPlan.service';
import { CustomerService } from '../../../customer/customer.service';
import { ExchangeRateService } from '../../../exchangeRate/exchangeRate.service';
import { CurrencyService } from '../../../currency/currency.service';
import { EmployeeService } from '../../../employee/employee.service';

@Component({
  selector: 'invoice-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./invoiceForm.scss'],
  templateUrl: './invoiceForm.html'
})
export class InvoiceForm {
  employee: any;
  @Input('formGroup') public formGroup: FormGroup;
  @ViewChild(DataTable) dataTable: DataTable;
  invoiceDate: Date = new Date();
  subscription: Subscription;
  loadingPlanItemList = [];
  loadingPlanList = [];
  customerList = [];
  // exchangeRates: any;
  exchangeRate: any;
  invoiceTypes: any;
  loadingPlans: any;
  totalAmount = 0.0;
  JSON: any = JSON;
  totalRecords = 0;
  loadingPlan: any;
  invoiceType: any;
  // customer: any;
  currency: any;
  invoice: any;
  rows = [];
  amount= 0;

    constructor(protected service: InvoiceService,
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private currencyService: CurrencyService,
    private customerService: CustomerService,
    private invoiceTypeService: InvoiceTypeService,
    private loadingPlanService: LoadingPlanService,
    private employeeService:  EmployeeService,
    private exchangeRateService: ExchangeRateService,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService) {
    this.formGroup = fb.group({
      id: '',
      totalAmount: '',
      currency: [null, ''],
      employee: [null, ''],
      loadingPlanList: [[]],
      exchangeRate: [null, ''],
      invoiceNumber: ['', Validators.required],
      customer: [null, Validators.required],
      invoiceDate: [this.invoiceDate, Validators.required],
      invoiceType: [this.invoiceType, Validators.required]

    });
  }

  getCustomerList(): void {
    this.customerService.getCombo().subscribe(customerList => (this.customerList = customerList));
  }

  getInvoiceTypes(): void {
    this.invoiceTypeService.getAll().subscribe(invoiceTypes => (this.invoiceTypes = invoiceTypes));
  }

  getLoadingPlanListByCustomer(id: number): void {
    this.loadingPlanService.getComboByCustomer(id).subscribe(loadingPlans => (this.loadingPlans = loadingPlans));
  }

  getEmployeeByCustomer(id: number): void {
    this.employeeService.getByCustomer(id).subscribe(employee => (this.employee = employee));
  }

  getCurrencyByCustomer(id: number): void {
    this.currencyService.getByCustomer(id).subscribe(currency => {
      this.currency = currency;
      this.getExchangeRate(currency.id, new Date().getTime());
    });
  }

  getExchangeRate(currencyId, exchangeRateDate): void {
    this.exchangeRateService.getByCurrencyAndExchangeRateDate(currencyId, exchangeRateDate).subscribe(exchangeRate => (
      this.exchangeRate = exchangeRate
      ));

  }

   ngOnInit(): void {
    this.getInvoiceTypes();
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

  refresh(): void {
    this.getInvoiceTypes();
    this.getCustomerList();
  }

  loadForm(data: any)
   {
    if (data != null) {
      data.invoiceDate = new Date(data.invoiceDate);
      this.invoice = data;
    }
    this.formGroup.patchValue(this.invoice, { onlySelf: true });
    this.setDisplayOfCustomer(this.invoice.customer);
    this.setDisplayOfLoadingPlan();
    this.fillTable();
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
    this.totalAmount = 0.0;
    for (let i = 0; i < this.formGroup.value.loadingPlanList.length; i++) {
      let xLoadingPlanItemList = this.formGroup.value.loadingPlanList[i].loadingPlanItemList;
      for (let ii = 0; ii < xLoadingPlanItemList.length; ii++) {
        let xLoadingPlanItem = xLoadingPlanItemList[ii];
        xLoadingPlanItem.amount=xLoadingPlanItem.quantity * xLoadingPlanItem.dispatchSchedule.salesOrderItem.unitPrice;
        this.totalAmount += xLoadingPlanItem.amount;
        this.loadingPlanItemList.push(xLoadingPlanItem);
      }
    }
  }

  public resetForm() {
    this.formGroup.reset();
    this.totalAmount = 0.0;
    this.loadingPlanItemList = [];
    this.loadingPlanItemList = this.loadingPlanItemList.slice();
  }

  public onSubmit(values: any, event: Event): void {
    event.preventDefault();
    values = this.formGroup.value;
    if (values.loadingPlanList === null || values.loadingPlanList.length === 0) {
      alert('loading Plan Required');
      return;
    }
    values.exchangeRate = this.exchangeRate;
    values.currency = this.currency;
    values.employee = this.employee;
    values.totalAmount = this.totalAmount;
    console.log(values);
    this.service.save(values).subscribe(data => {
      this.sharedService.addMessage({
        severity: 'info',
        summary: 'Success',
        detail: 'Operation Success'
      });
      this.resetForm();
      this.router.navigate(['/pages/invoice/form/']);
    });
  }

  /*================== Invoice Type Filter ===================*/
  filteredInvoiceTypes: any[];

  filterInvoiceTypes(event) {
    let query = event.query.toLowerCase();
    this.filteredInvoiceTypes = [];
    for (let i = 0; i < this.invoiceTypes.length; i++) {
      let invoiceType = this.invoiceTypes[i];
      if (invoiceType.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredInvoiceTypes.push(invoiceType);
      }
    }
  }

  onInvoiceTypeSelect(event: any) {}

  /*================== End Of Invoice Type Filter ===================*/
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
  /*================== CustomerFilter ===================*/
  filteredCustomerList: any[];

  filterCustomerList(event) {
    let query = event.query.toLowerCase();
    this.filteredCustomerList = [];
    for (let i = 0; i < this.customerList.length; i++) {
      let customer = this.customerList[i];
      if (
        customer.code.toLowerCase().indexOf(query) === 0 ||
        customer.name.toLowerCase().indexOf(query) === 0
      ) {
        this.filteredCustomerList.push(customer);
      }
    }
  }

  handleCustomerDropdownClick() {
    this.filteredCustomerList = [];
    ///mimic remote call
    setTimeout(() => {
      this.filteredCustomerList = this.customerList;
    }, 100);
  }

  onCustomerSelect(event: any) {
    let customer = this.formGroup.value.customer;
    this.setDisplayOfCustomer(customer);
    this.getLoadingPlanListByCustomer(+customer.id);
    this.getCurrencyByCustomer(+customer.id);
    this.getEmployeeByCustomer(+customer.id);
  }

  setDisplayOfCustomer(customer: any) {
    if (customer != null && customer !== undefined) {
      let display =
        customer.code != null && customer.code !== undefined
          ? customer.code + ' : '
          : '';
      display +=
        customer.name != null && customer.name !== undefined
          ? customer.name
          : '';
      this.formGroup.value.customer.display = display;
    }
  }
}
