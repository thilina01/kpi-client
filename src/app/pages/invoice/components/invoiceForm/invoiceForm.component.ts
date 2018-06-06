import { Component, ViewEncapsulation, Input, ViewChild } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { SharedService } from "../../../../services/shared.service";
import { InvoiceService } from "../../invoice.service";
import { InvoiceTypeService } from "../../../invoiceType/invoiceType.service";
import { DataTable, ConfirmationService } from "primeng/primeng";
import { DispatchService } from "../../../../services/dispatch.service";
import "rxjs/add/operator/take";
import { DispatchNoteService } from "../../../dispatchNote/dispatchNote.service";
import { CustomerService } from "../../../customer/customer.service";
import { ExchangeRateService } from "../../../exchangeRate/exchangeRate.service";
import { CurrencyService } from "../../../currency/currency.service";
import { EmployeeService } from "../../../employee/employee.service";

@Component({
  selector: "invoice-form",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./invoiceForm.scss"],
  templateUrl: "./invoiceForm.html"
})
export class InvoiceForm {
  employee: any;
  @Input("formGroup") public formGroup: FormGroup;
  @ViewChild(DataTable) dataTable: DataTable;
  invoiceDate: Date = new Date();
  subscription: Subscription;
  loadingPlanItemList = [];
  dispatchNoteList = [];
  loadingPlanList = [];
  customerList = [];
  // exchangeRateDate = '';
  exchangeRateAmount = 0.0;
  invoiceTypes: any;
  dispatchNotes: any;
  totalAmount = 0.0;
  totalWeight = 0.0;
  taxValue = 0.0;
  totalSalesAmount = 0.0;
  // exchangeRate :any;
  dispatchNote: any;
  invoiceType: any;
  JSON: any = JSON;
  totalRecords = 0;
  currency: any;
  invoice: any;
  rows = [];
  amount = 0;

  constructor(
    protected service: InvoiceService,
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private currencyService: CurrencyService,
    private customerService: CustomerService,
    private employeeService: EmployeeService,
    private invoiceTypeService: InvoiceTypeService,
    private dispatchNoteService: DispatchNoteService,
    private exchangeRateService: ExchangeRateService,
    private confirmationService: ConfirmationService
  ) {
    this.formGroup = fb.group({
      id: "",
      totalAmount: "",
      totalWeight: "",
      taxRate: "",
      taxValue: "",
      totalSalesAmount: "",
      currency: [null, ""],
      employee: [null, ""],
      dispatchNoteList: [null, Validators.required],
      exchangeRate: [null, Validators.required],
      customer: [null, Validators.required],
      invoiceNumber: ["", Validators.required],
      invoiceDate: [this.invoiceDate, Validators.required],
      invoiceType: [this.invoiceType, Validators.required]
    });
  }

  getCustomerList(): void {
    this.customerService
      .getCombo()
      .subscribe(customerList => (this.customerList = customerList));
  }

  getInvoiceTypes(): void {
    this.invoiceTypeService
      .getAll()
      .subscribe(invoiceTypes => (this.invoiceTypes = invoiceTypes));
  }

  getDispatchNoteListByCustomer(id: number): void {
    this.dispatchNoteService
      .getByCustomerAndInvoiceIsNull(id)
      .subscribe(dispatchNotes => (this.dispatchNotes = dispatchNotes));
  }

  getEmployeeByCustomer(id: number): void {
    this.employeeService
      .getByCustomer(id)
      .subscribe(employee => (this.employee = employee));
  }

  getCurrencyByCustomer(id: number): void {
    this.currencyService.getByCustomer(id).subscribe(currency => {
      this.currency = currency;
      let startDate = new Date(this.invoiceDate.getTime());
      let endDate = new Date(this.invoiceDate.getTime());
      startDate.setDate(startDate.getDate() - 7);

      console.log("startDate : " + startDate);
      console.log("endDate : " + endDate);

      this.getExchangeRate(currency.id, startDate.getTime(), endDate.getTime());
    });
  }

  getExchangeRate(currencyId, startDate, endDate): void {
    this.exchangeRateService
      .getByCurrencyAndExchangeRateDate(currencyId, startDate, endDate)
      .subscribe(exchangeRateList => {
        this.formGroup.value.exchangeRate = null;
        if (exchangeRateList.length > 0) {
          let exchangeRate = exchangeRateList[0];
          this.formGroup.patchValue({
            exchangeRate: exchangeRate
          });
          console.log(this.formGroup.value.exchangeRate.id);
        } else {
          alert("Please Update exchange rate");
        }
      });
  }

  ngOnInit(): void {
    this.getInvoiceTypes();
    this.getCustomerList();
    this.route.params.subscribe((params: Params) => {
      let id = params["id"];
      id = id === undefined ? "0" : id;
      if (id !== "0") {
        this.service
          .get(+id)
          .take(1)
          .subscribe(data => {
            this.loadForm(data);
          });
      }
    });
  }

  refresh(): void {
    this.getInvoiceTypes();
    this.getCustomerList();
  }

  loadForm(data: any) {
    if (data != null) {
      data.invoiceDate = new Date(data.invoiceDate);
      this.invoice = data;
    }
    this.formGroup.patchValue(this.invoice, { onlySelf: true });
    this.setDisplayOfCustomer(this.invoice.customer);
    this.setDisplayOfDispatchNote();
    this.fillTable();
  }

  public onEnter() {
    console.log(this.formGroup);
    if (this.formGroup.value.dispatchNoteList === null) {
      this.formGroup.value.dispatchNoteList = [];
    }
    for (let i = 0; i < this.formGroup.value.dispatchNoteList.length; i++) {
      let dispatchNote = this.formGroup.value.dispatchNoteList[i];
      if (dispatchNote === undefined) return;
      if (dispatchNote.id === this.selectedDispatchNote.id) {
        alert("Already Added");
        return;
      }
    }
    this.formGroup.value.dispatchNoteList.push(this.selectedDispatchNote);
    this.formGroup.patchValue({
      dispatchNoteList: this.formGroup.value.dispatchNoteList.slice()
    });
    this.fillTable();
  }

  public fillTable() {

    this.loadingPlanItemList = [];
    this.loadingPlanList = [];
    this.totalAmount = 0.0;
    this.totalWeight = 0.0;

    for (let i = 0; i < this.formGroup.value.dispatchNoteList.length; i++) {
      let dispatchNote = this.formGroup.value.dispatchNoteList[i];
      if (dispatchNote === undefined) continue;
      let yLoadingPlanList = dispatchNote.loadingPlanList;

      for (let ii = 0; ii < yLoadingPlanList.length; ii++) {
        let xLoadingPlanItemList = yLoadingPlanList[ii].loadingPlanItemList;

        for (let iii = 0; iii < xLoadingPlanItemList.length; iii++) {
          let xLoadingPlanItem = xLoadingPlanItemList[iii];

          xLoadingPlanItem.amount =
            xLoadingPlanItem.invoiceQuantity *
            xLoadingPlanItem.dispatchSchedule.salesOrderItem.unitPrice;
          this.totalAmount += xLoadingPlanItem.amount;

          xLoadingPlanItem.weight =
            xLoadingPlanItem.invoiceQuantity *
            xLoadingPlanItem.dispatchSchedule.job.item.weight;
          this.totalWeight += xLoadingPlanItem.weight;

          this.loadingPlanItemList.push(xLoadingPlanItem);
          console.log(this.loadingPlanItemList);
        }
      }
    }
    this.loadingPlanItemList = this.loadingPlanItemList.slice();
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
    if (
      values.dispatchNoteList === null ||
      values.dispatchNoteList.length === 0
    ) {
      alert("loading Plan Required");
      return;
    }

    values.totalAmount = this.totalAmount;
    let exchangeRate = this.formGroup.value.exchangeRate.exchangeRate;
    let totalAmount = this.totalAmount;
    this.totalSalesAmount = totalAmount * exchangeRate;

    values.totalSalesAmount = this.totalSalesAmount;
    let taxRate = this.formGroup.value.invoiceType.taxRate;
    let totalSalesAmount = this.totalSalesAmount;
    this.taxValue = totalSalesAmount * taxRate;

    values.currency = this.currency;
    values.totalWeight = this.totalWeight;
    values.totalSalesAmount = this.totalSalesAmount;
    values.taxValue = this.taxValue;
    this.formGroup.value.employee = this.formGroup.value.customer.employee;
    this.formGroup.value.taxRate = this.formGroup.value.invoiceType.taxRate;
    //values.exchangeRate = this.exchangeRate;
    console.log(values);
    this.service.save(values).subscribe(data => {
      this.sharedService.addMessage({
        severity: "info",
        summary: "Success",
        detail: "Operation Success"
      });
      this.resetForm();
      this.router.navigate(["/pages/invoice/form/"]);
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
  /*================== Dispatch Note Filter ===================*/
  filteredDispatchNotes: any[];
  selectedDispatchNote: any;
  filterDispatchNotes(event) {
    let query = event.query.toLowerCase();
    this.filteredDispatchNotes = [];
    for (let i = 0; i < this.dispatchNotes.length; i++) {
      let dispatchNote = this.dispatchNotes[i];
      if (dispatchNote.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredDispatchNotes.push(dispatchNote);
      }
    }
  }

  onDispatchNoteSelect(event: any) {
    this.setDisplayOfDispatchNote();
  }
  setDisplayOfDispatchNote() {
    let dispatchNote = this.formGroup.value.dispatchNote;
    if (dispatchNote != null && dispatchNote !== undefined) {
      let display =
        dispatchNote.code != null && dispatchNote.code !== undefined
          ? dispatchNote.code + " : "
          : "";
      display +=
        dispatchNote.name != null && dispatchNote.name !== undefined
          ? dispatchNote.name
          : "";
      this.formGroup.value.dispatchNote.display = display;
    }
  }
  /*================== End Of Dispatch Note Filter ===================*/
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
    this.invoiceDate = this.formGroup.value.invoiceDate;
    console.log(this.invoiceDate);
    this.setDisplayOfCustomer(customer);
    this.getDispatchNoteListByCustomer(+customer.id);
    this.getCurrencyByCustomer(+customer.id);
    this.getEmployeeByCustomer(+customer.id);
  }

  setDisplayOfCustomer(customer: any) {
    if (customer != null && customer !== undefined) {
      let display =
        customer.code != null && customer.code !== undefined
          ? customer.code + " : "
          : "";
      display +=
        customer.name != null && customer.name !== undefined
          ? customer.name
          : "";
      this.formGroup.value.customer.display = display;
    }
  }
}
