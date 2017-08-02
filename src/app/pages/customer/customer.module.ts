import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule,PanelModule,AutoCompleteModule } from 'primeng/primeng';

import { Customer } from './customer.component';

import { routing } from './customer.routing';
import { CustomerTable } from "./component/customerTable/customerTable.component";
import { CustomerForm } from "./component/customerForm/customerForm.component";
import { CustomerService } from "../../services/customer.service";
import { CurrencyService } from "../../services/currency.service";
import { CustomerTypeService } from "../../services/customerType.service";
import { PaymentTermService } from "../../services/paymentTerm.service";
import { IncotermService } from "../../services/incoterm.service";
import { NotifyPartyService } from "../../services/notifyParty.service";

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
