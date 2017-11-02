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
import { CustomerService } from '../customer/customer.service';
import { DispatchNoteService } from '../dispatchNote/dispatchNote.service';
import { MaterialModule } from '@angular/material';
import { DispatchService } from '../../services/dispatch.service';

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
    MaterialModule,
    DialogModule,
    AutoCompleteModule,
    routing
  ],
  declarations: [
    Invoice,
    InvoiceTable,
    InvoiceForm
  ],
  providers: [
    InvoiceService,
    InvoiceTypeService,
    CustomerService,
    DispatchNoteService,
    DispatchService
    

  ]
})
export class InvoiceModule { }
