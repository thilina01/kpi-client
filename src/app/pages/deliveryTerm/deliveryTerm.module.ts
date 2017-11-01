import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, FileUploadModule } from 'primeng/primeng';

import { DeliveryTerm } from './deliveryTerm.component';
import { DeliveryTermTable } from './components/deliveryTermTable/deliveryTermTable.component';
import { DeliveryTermForm } from './components/deliveryTermForm/deliveryTermForm.component';

import { routing } from './deliveryTerm.routing';
import { DeliveryTermService } from './deliveryTerm.service';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { DeliveryTermImport } from './components/deliveryTermImport/deliveryTermImport.component';

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
    DeliveryTerm,
    DeliveryTermTable,
    DeliveryTermForm,
    DeliveryTermImport
    
  ],
  providers: [
    DeliveryTermService
  ]
})
export class DeliveryTermModule { }
