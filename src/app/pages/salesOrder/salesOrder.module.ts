import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule, AutoCompleteModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { SalesOrder } from './salesOrder.component';
import { LossTypeService } from '../../services/lossType.service';
import { SalesOrderTable } from './components/salesOrderTable/salesOrderTable.component';
import { SalesOrderForm } from './components/salesOrderForm/salesOrderForm.component';

import { routing } from './salesOrder.routing';
import { LabourSourceService } from "../labourSource/labourSource.service";
import { SalesOrderService } from "./salesOrder.service";
import { CustomerItemService } from "../customerItem/customerItem.service";
import { CustomerService } from "../customer/customer.service";
import { SalesOrderTypeService } from "../salesOrderType/salesOrderType.service";


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
    SalesOrder,
    SalesOrderTable,
    SalesOrderForm
  ],
  providers: [CustomerService, SalesOrderService, LabourSourceService,CustomerItemService,SalesOrderTypeService]
})
export class SalesOrderModule { }