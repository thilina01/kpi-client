import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, AutoCompleteModule, InputTextModule } from 'primeng/primeng';

import { Customer } from './customer.component';

import { routing } from './customer.routing';
import { CustomerTable } from "./component/customerTable/customerTable.component";
import { CustomerForm } from "./component/customerForm/customerForm.component";



import { CustomerService } from "./customer.service";
import { CustomerTypeService } from "../customerType/customerType.service";
import { IncotermService } from "../incoterm/incoterm.service";
import { CurrencyService } from "../currency/currency.service";
import { NotifyPartyService } from "../notifyParty/notifyParty.service";
import { PaymentTermService } from "../paymentTerm/paymentTerm.service";

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    AutoCompleteModule,
    InputTextModule,
    routing
  ],
  declarations: [
    Customer,
    CustomerTable,
    CustomerForm
  ],
  providers: [
    CustomerService,
    CustomerTypeService,
    CurrencyService,
    NotifyPartyService,
    PaymentTermService,
    IncotermService
  ]
})
export class CustomerModule { }
