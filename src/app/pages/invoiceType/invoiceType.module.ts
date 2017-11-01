import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule, FileUploadModule } from 'primeng/primeng';

import { InvoiceType } from './invoiceType.component';
import { InvoiceTypeTable } from './components/invoiceTypeTable/invoiceTypeTable.component';
import { InvoiceTypeForm } from './components/invoiceTypeForm/invoiceTypeForm.component';

import { routing } from './invoiceType.routing';
import { InvoiceTypeService } from './invoiceType.service';
import { InvoiceTypeImport } from './components/invoiceTypeImport/invoiceTypeImport.component';

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
    FileUploadModule,    
    routing
  ],
  declarations: [
    InvoiceType,
    InvoiceTypeTable,
    InvoiceTypeForm,
    InvoiceTypeImport
    
  ],
  providers: [
    InvoiceTypeService
  ]
})
export class InvoiceTypeModule { }
