import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule, AutoCompleteModule, DialogModule } from 'primeng/primeng';

import { Invoice } from './invoice.component';
import { InvoiceTable } from './components/invoiceTable/invoiceTable.component';
import { InvoiceForm } from './components/invoiceForm/invoiceForm.component';

import { routing } from './invoice.routing';
import { InvoiceService } from './invoice.service';
import { InvoiceTypeService } from '../invoiceType/invoiceType.service';
// import { MaterialModule } from '@angular/material';
import { DispatchService } from '../../services/dispatch.service';
import { LoadingPlanService } from '../loadingPlan/loadingPlan.service';
import { CustomerService } from '../customer/customer.service';
import { PrintService } from '../../services/print.service';
import { ExchangeRateService } from '../exchangeRate/exchangeRate.service';
import { CurrencyService } from '../currency/currency.service';
import { CommercialInvoicePrint } from './components/commercialInvoicePrint';
import { TaxInvoicePrint } from './components/taxInvoicePrint ';
import { SuspendedInvoicePrint } from './components/suspendedInvoicePrint /suspendedInvoicePrint.component';
import { EmployeeService } from '../employee/employee.service';
import { DispatchNoteService } from '../dispatchNote/dispatchNote.service';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    InputTextModule,
    CalendarModule,
    // MaterialModule,
    DialogModule,
    AutoCompleteModule,
    routing
  ],
  declarations: [
    Invoice,
    InvoiceTable,
    InvoiceForm,
    CommercialInvoicePrint,
    TaxInvoicePrint,
    SuspendedInvoicePrint
  ],
  providers: [
    InvoiceService,
    InvoiceTypeService,
    DispatchNoteService,
    PrintService,
    ExchangeRateService,
    CurrencyService,
    CustomerService,
    EmployeeService
  ]
})
export class InvoiceModule { }
