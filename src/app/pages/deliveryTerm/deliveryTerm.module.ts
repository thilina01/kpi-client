import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { DeliveryTerm } from './deliveryTerm.component';
import { DeliveryTermTable } from './components/deliveryTermTable/deliveryTermTable.component';
import { DeliveryTermForm } from './components/deliveryTermForm/deliveryTermForm.component';

import { routing } from './deliveryTerm.routing';
import { DeliveryTermService } from "./deliveryTerm.service";
import { CalendarModule } from "primeng/components/calendar/calendar";


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
    routing
  ],
  declarations: [
    DeliveryTerm,
    DeliveryTermTable,
    DeliveryTermForm
  ],
  providers: [
    DeliveryTermService
  ]
})
export class DeliveryTermModule { }
