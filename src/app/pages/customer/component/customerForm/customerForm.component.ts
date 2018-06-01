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
import { CustomerService } from "../../customer.service";
import { CustomerTypeService } from "../../../customerType/customerType.service";
import { IncotermService } from "../../../incoterm/incoterm.service";
import { CurrencyService } from "../../../currency/currency.service";
import { NotifyPartyService } from "../../../notifyParty/notifyParty.service";
import { PaymentTermService } from "../../../paymentTerm/paymentTerm.service";
import { CountryService } from "../../../country/country.service";
import { AddressTypeService } from "../../../addressType/addressType.service";
import { ContactTypeService } from "../../../contactType/contactType.service";
import { DataTable, ConfirmationService } from "primeng/primeng";
import "rxjs/add/operator/take";
import { PortService } from "../../../port/port.service";
import { EmployeeService } from "../../../employee/employee.service";

@Component({
  selector: "customer-form",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./customerForm.scss"],
  templateUrl: "./customerForm.html"
})
export class CustomerForm {
  public formGroup: FormGroup;
  public contactFormGroup: FormGroup;
  public addressFormGroup: FormGroup;
  @ViewChild(DataTable) dataTable: DataTable;

  [x: string]: any;
  JSON: any = JSON;
  subscription: Subscription;

  contactList = [];
  addressList = [];
  paymentTermList = [];
  notifyPartyList = [];
  incotermList = [];
  currencyList = [];
  customerTypeList = [];
  countryList = [];
  addressTypeList = [];
  contactTypeList = [];
  employeeList = [];
  portList = [];

  paymentTerm: any = { id: "", code: "", name: "" };
  notifyParty: any = { id: "", code: "", name: "" };
  incoterm: any = { id: "", code: "", name: "" };
  currency: any = { id: "", code: "", name: "" };
  customerType: any = { id: "", code: "", name: "" };
  country: any = { id: "", code: "", name: "" };
  customer: any = { id: "", code: "", name: "" };
  addressType: any = { id: "", code: "", name: "" };
  contactType: any = { id: "", code: "", name: "" };
  port: any = { id: "", code: "", name: "" };
  employee: any = { id: "", code: "", name: "" };

  constructor(
    protected service: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder,
    private sharedService: SharedService,
    private customerTypeService: CustomerTypeService,
    private confirmationService: ConfirmationService,
    private currencyService: CurrencyService,
    private incotermService: IncotermService,
    private paymentTermService: PaymentTermService,
    private countryService: CountryService,
    private addressTypeService: AddressTypeService,
    private portService: PortService,
    private employeeService: EmployeeService,
    private contactTypeService: ContactTypeService,
    private notifyPartyService: NotifyPartyService
  ) {
    this.formGroup = fb.group({
      id: "",
      shortName: "",
      code: ["", Validators.required],
      name: ["", Validators.required],
      consignee: "",
      continent: "",
      specialRequirements: "",
      note: "",
      vatNo: "",
      sVatNo: "",
      finalDestination: "",
      paymentTerm: ["", Validators.required],
      notifyParty: ["", Validators.required],
      incoterm: [this.incoterm, Validators.required],
      currency: [this.currency, Validators.required],
      customerType: [this.customerType, Validators.required],
      employee: [{}, Validators.compose([Validators.required])],
      contactList: [[]],
      addressList: [[]]
    });

    this.contactFormGroup = fb.group({
      contactNumber: "",
      contactType: [{}, Validators.compose([Validators.required])]
    });

    this.addressFormGroup = fb.group({
      line1: "",
      line2: "",
      line3: "",
      line4: "",
      line5: "",
      addressType: [{}, Validators.compose([Validators.required])],
      port: [],
      country: [{}, Validators.compose([Validators.required])]
    });
  }

  getCustomerTypeList(): void {
    this.customerTypeService
      .getCombo()
      .subscribe(
        customerTypeList => (this.customerTypeList = customerTypeList)
      );
  }

  getPortList(): void {
    this.portService
      .getCombo()
      .subscribe(portList => (this.portList = portList));
  }

  getCurrencyList(): void {
    this.currencyService
      .getCombo()
      .subscribe(currencyList => (this.currencyList = currencyList));
  }

  getIncotermList(): void {
    this.incotermService
      .getCombo()
      .subscribe(incotermList => (this.incotermList = incotermList));
  }

  getNotifyPartyList(): void {
    this.notifyPartyService
      .getCombo()
      .subscribe(notifyPartyList => (this.notifyPartyList = notifyPartyList));
  }

  getPaymentTermList(): void {
    this.paymentTermService
      .getCombo()
      .subscribe(paymentTermList => (this.paymentTermList = paymentTermList));
  }

  getCountryList(): void {
    this.countryService
      .getCombo()
      .subscribe(countryList => (this.countryList = countryList));
  }

  getAddressTypeList(): void {
    this.addressTypeService
      .getCombo()
      .subscribe(addressTypeList => (this.addressTypeList = addressTypeList));
  }

  getContactTypeList(): void {
    this.contactTypeService
      .getCombo()
      .subscribe(contactTypeList => (this.contactTypeList = contactTypeList));
  }

  getEmployeeList(): void {
    this.employeeService
      .getCombo()
      .subscribe(employeeList => (this.employeeList = employeeList));
  }

  refresh(): void {
    this.getCountryList();
    this.getCurrencyList();
    this.getIncotermList();
    this.getNotifyPartyList();
    this.getPaymentTermList();
    this.getAddressTypeList();
    this.getContactTypeList();
    this.getCustomerTypeList();
    this.getPortList();
    this.getEmployeeList();
  }

  fillContacts(): void {
    this.formGroup.value.contactList = this.formGroup.value.contactList.slice();
    this.dataTable.reset();
  }

  fillAddresses(): void {
    this.formGroup.value.addressList = this.formGroup.value.addressList.slice();
    this.dataTable.reset();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.refresh();
    }, 500);
    this.getCountryList();
    this.getCurrencyList();
    this.getIncotermList();
    this.getNotifyPartyList();
    this.getPaymentTermList();
    this.getAddressTypeList();
    this.getContactTypeList();
    this.getCustomerTypeList();
    this.getEmployeeList();
    this.getPortList();
    this.route.params.subscribe((params: Params) => {
      let id = params["id"];
      id = id == undefined ? "0" : id;
      if (id != "0") {
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
    if (data == null) {
      return;
    }
    this.customer = data;
    this.formGroup.patchValue(this.customer, { onlySelf: true });
    this.customerType = this.customer.customerType;
    this.currency = this.customer.currency;
    this.incoterm = this.customer.incoterm;
    this.notifyparty = this.customer.notifyparty;
    this.paymentTerm = this.customer.paymentTerm;
    this.country = this.customer.country;
    this.addressType = this.customer.addressType;
    this.contactType = this.customer.contactType;
    this.port = this.customer.port;
    this.employee = this.customer.employee;
  }

  public onSubmit(values: any, event: Event): void {
    this.submitted = true;
    if (this.formGroup.valid) {
      if (values.contactList === null || values.contactList.length === 0) {
        alert("contact Required");
        return;
      }

      if (values.addressList === null || values.addressList.length === 0) {
        alert("address Required");
        return;
      }

      event.preventDefault();
      console.log(values);

      this.service.save(values).subscribe(data => {
        this.sharedService.addMessage({
          severity: "info",
          summary: "Success",
          detail: "Operation Success"
        });
        this.resetForm();
        this.router.navigate(["/pages/customer/form/"]);
      });
    }
  }

  public resetForm() {
    this.formGroup.reset();
    this.contactFormGroup.reset();
    this.addressFormGroup.reset();
  }

  public removeContact(id: number) {
    if (this.formGroup.value.contactList != null) {
      this.confirmationService.confirm({
        message: "Are you sure that you want to Delete?",
        accept: () => {
          this.formGroup.value.contactList.splice(id, 1);
          this.fillContacts();
        }
      });
    }
  }

  public removeAddress(id: number) {
    if (this.formGroup.value.addressList != null) {
      this.confirmationService.confirm({
        message: "Are you sure that you want to Delete?",
        accept: () => {
          this.formGroup.value.addressList.splice(id, 1);
          this.fillAddresses();
        }
      });
    }
  }

  public onEnterContact(contactNumber: string, dt: DataTable) {
    if (this.contactFormGroup.valid) {
      let values = this.contactFormGroup.value;
      if (this.formGroup.value.contactList == null) {
        this.formGroup.value.contactList = [];
      }
      this.formGroup.value.contactList.push(values);
      this.contactFormGroup.reset();
      document.getElementById("contactNumber").focus();
      this.formGroup.value.contactList = this.formGroup.value.contactList.slice();
    } else {
      console.log(this.contactFormGroup.errors);
    }
  }

  public onEnterAddress(line5: string, dt: DataTable) {
    if (this.addressFormGroup.valid) {
      let values = this.addressFormGroup.value;
      if (this.formGroup.value.addressList == null) {
        this.formGroup.value.addressList = [];
      }

      this.formGroup.value.addressList.push(values);
      this.addressFormGroup.reset();
      document.getElementById("line5").focus();
      this.formGroup.value.addressList = this.formGroup.value.addressList.slice();
    } else {
      console.log(this.addressFormGroup.errors);
    }
  }
  /*================== CurrencyFilter ===================*/
  filteredCurrencyList: any[];

  filterCurrencyList(event) {
    let query = event.query.toLowerCase();
    this.filteredCurrencyList = [];
    for (let i = 0; i < this.currencyList.length; i++) {
      let currency = this.currencyList[i];
      if (currency.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredCurrencyList.push(currency);
      }
    }
  }

  onCurrencySelect(event: any) {}
  /*================== Customer Type Filter ===================*/
  filteredCustomerTypes: any[];

  filterCustomerTypes(event) {
    let query = event.query.toLowerCase();
    this.filteredCustomerTypes = [];
    for (let i = 0; i < this.customerTypeList.length; i++) {
      let customerType = this.customerTypeList[i];
      if (customerType.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredCustomerTypes.push(customerType);
      }
    }
  }

  onCustomerTypeSelect(event: any) {}
  /*================== End Of Customer Type Filter ===================*/
  /*================== Notify PartyFilter ===================*/
  filteredNotifyPartys: any[];

  filterNotifyPartys(event) {
    let query = event.query.toLowerCase();
    this.filteredNotifyPartys = [];
    for (let i = 0; i < this.notifyPartyList.length; i++) {
      let notifyParty = this.notifyPartyList[i];
      if (notifyParty.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredNotifyPartys.push(notifyParty);
      }
    }
  }

  onNotifyPartySelect(event: any) {}

  /*================== End Of Notify PartyFilter ===================*/
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
  /*================== Payment TermFilter ===================*/
  filteredPaymentTerms: any[];

  filterPaymentTerms(event) {
    let query = event.query.toLowerCase();
    this.filteredPaymentTerms = [];
    for (let i = 0; i < this.paymentTermList.length; i++) {
      let paymentTerm = this.paymentTermList[i];
      if (paymentTerm.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredPaymentTerms.push(paymentTerm);
      }
    }
  }

  onPaymentTermSelect(event: any) {}
  /*================== End Of Payment TermFilter ===================*/
  /*================== Incoterm Filter ===================*/
  filteredIncoterms: any[];

  filterIncoterms(event) {
    let query = event.query.toLowerCase();
    this.filteredIncoterms = [];
    for (let i = 0; i < this.incotermList.length; i++) {
      let incoterm = this.incotermList[i];
      if (incoterm.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredIncoterms.push(incoterm);
      }
    }
  }

  onIncotermSelect(event: any) {}
  /*================== End Of Incoterm Filter ===================*/
  /*================== Address Type Filter ===================*/
  filteredAddressTypes: any[];

  filterAddressTypes(event) {
    let query = event.query.toLowerCase();
    this.filteredAddressTypes = [];
    for (let i = 0; i < this.addressTypeList.length; i++) {
      let addressType = this.addressTypeList[i];
      if (addressType.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredAddressTypes.push(addressType);
      }
    }
  }

  onAddressTypeSelect(event: any) {}

  /*================== End Of Address Type Filter ===================*/
  /*================== ContactTypeFilter ===================*/
  filteredContactTypeList: any[];

  filterContactTypeList(event) {
    let query = event.query.toLowerCase();
    this.filteredContactTypeList = [];
    for (let i = 0; i < this.contactTypeList.length; i++) {
      let contactType = this.contactTypeList[i];
      if (contactType.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredContactTypeList.push(contactType);
      }
    }
  }
  onContactTypeSelect(event: any) {}
  /*================== CountryFilter ===================*/
  filteredCountryList: any[];

  filterCountryList(event) {
    let query = event.query.toLowerCase();
    this.filteredCountryList = [];
    for (let i = 0; i < this.countryList.length; i++) {
      let country = this.countryList[i];
      if (country.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredCountryList.push(country);
      }
    }
  }

  onCountrySelect(event: any) {}

  /*================== Port Filter ===================*/
  filteredPorts: any[];

  filterPorts(event) {
    let query = event.query.toLowerCase();
    this.filteredPorts = [];
    for (let i = 0; i < this.portList.length; i++) {
      let port = this.portList[i];
      if (port.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredPorts.push(port);
      }
    }
  }

  onPortSelect(event: any) {}
  /*================== End Of Port Filter ===================*/
}
