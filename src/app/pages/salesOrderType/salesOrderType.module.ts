import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';
import { SalesOrderType } from './salesOrderType.component';
import { SalesOrderTypeTable } from './components/salesOrderTypeTable/salesOrderTypeTable.component';
import { SalesOrderTypeForm } from './components/salesOrderTypeForm/salesOrderTypeForm.component';

import { routing } from './salesOrderType.routing';
import { SalesOrderTypeService } from './salesOrderType.service';
import { WorkCenterService } from '../workCenter/workCenter.service';

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
    SalesOrderType,
    SalesOrderTypeTable,
    SalesOrderTypeForm
  ],
  providers: [
    SalesOrderTypeService,
    WorkCenterService
  ]
})
export class SalesOrderTypeModule { }
