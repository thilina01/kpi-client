import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule, AutoCompleteModule, InputTextModule } from 'primeng/primeng';
import { InvoiceInformation } from './invoiceInformation.component';
import { InvoiceInformationTable } from './components/invoiceInformationTable/invoiceInformationTable.component';

import { routing } from './invoiceInformation.routing';
import { CustomerService } from '../customer/customer.service';
import { LoadingPlanItemService } from '../../services/loadingPlanItem.service';
import { JobService } from '../job/job.service';
import { InvoiceService } from '../invoice/invoice.service';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    CalendarModule,
    AutoCompleteModule,
    InputTextModule,
    routing
  ],
  declarations: [
    InvoiceInformation,
    InvoiceInformationTable
  ],
  providers: [
    LoadingPlanItemService,
    CustomerService,
    InvoiceService,
    JobService
  ]
})
export class InvoiceInformationModule { }
