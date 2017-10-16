import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule, AutoCompleteModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { OnTimeDelivery } from './onTimeDelivery.component';
import { LossTypeService } from '../../services/lossType.service';
import { OnTimeDeliveryTable } from './components/onTimeDeliveryTable/onTimeDeliveryTable.component';
import { OnTimeDeliveryForm } from './components/onTimeDeliveryForm/onTimeDeliveryForm.component';

import { routing } from './onTimeDelivery.routing';
import { OnTimeDeliveryService } from './onTimeDelivery.service';
import { CustomerService } from '../customer/customer.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    MaterialModule,
    SharedModule,
    PanelModule,
    InputTextModule,
    AutoCompleteModule,
    routing
  ],
  declarations: [
    OnTimeDelivery,
    OnTimeDeliveryTable,
    OnTimeDeliveryForm
  ],
  providers: [
    OnTimeDeliveryService,
    CustomerService
  ]
})
export class OnTimeDeliveryModule { }
