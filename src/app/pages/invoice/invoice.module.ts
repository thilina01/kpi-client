import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  DataTableModule,
  SharedModule,
  PanelModule,
  InputTextModule,
  CalendarModule,
  AutoCompleteModule,
  DialogModule,
  TabViewModule,
  CheckboxModule
} from 'primeng/primeng';

import { Invoice } from './invoice.component';
import { InvoiceTable } from './components/invoiceTable/invoiceTable.component';
import { InvoiceForm } from './components/invoiceForm/invoiceForm.component';

import { routing } from './invoice.routing';
import { InvoiceService } from './invoice.service';
import { InvoiceTypeService } from '../invoiceType/invoiceType.service';
import { CustomerService } from '../customer/customer.service';
import { PrintService } from '../../services/print.service';
import { ExchangeRateService } from '../exchangeRate/exchangeRate.service';
import { CurrencyService } from '../currency/currency.service';
import { TaxInvoicePrint } from './components/taxInvoicePrint ';
import { SuspendedInvoicePrint } from './components/suspendedInvoicePrint /suspendedInvoicePrint.component';
import { EmployeeService } from '../employee/employee.service';
import { DispatchNoteService } from '../dispatchNote/dispatchNote.service';
import { LoadingPlanItemService } from '../../services/loadingPlanItem.service';
import { CreditNoteForm } from './components/creditNote/creditNoteForm.component';
import { CreditNoteService } from './components/creditNote/creditNote.service';
import { CreditNoteTable } from './components/creditNoteTable/creditNoteTable.component';
import { CommercialInvoicePrint } from './components/commercialInvoicePrint/commercialInvoicePrint.component';
import { CreditNotePrint } from './components/creditNotePrint /creditNotePrint.component';
import { SuspendedCreditNotePrint } from './components/suspendedCreditNotePrint /suspendedCreditNotePrint.component';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    CheckboxModule,
    InputTextModule,
    CalendarModule,
    DialogModule,
    TabViewModule,
    AutoCompleteModule,
    routing
  ],
  declarations: [
    Invoice,
    InvoiceTable,
    InvoiceForm,
    TaxInvoicePrint,
    CommercialInvoicePrint,
    SuspendedInvoicePrint,
    CreditNotePrint,
    SuspendedCreditNotePrint,
    CreditNoteForm,
    CreditNoteTable,
  ],
  providers: [
    InvoiceService,
    InvoiceTypeService,
    DispatchNoteService,
    PrintService,
    ExchangeRateService,
    CurrencyService,
    CustomerService,
    EmployeeService,
    LoadingPlanItemService,
    CreditNoteService
  ]
})
export class InvoiceModule {}
