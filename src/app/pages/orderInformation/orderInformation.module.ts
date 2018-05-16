import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule, AutoCompleteModule } from 'primeng/primeng';
import { OrderInformation } from './orderInformation.component';
import { OrderInformationTable } from './components/orderInformationTable/orderInformationTable.component';

import { routing } from './orderInformation.routing';
import { CustomerService } from '../customer/customer.service';
import { DispatchScheduleService } from '../dispatchSchedule/dispatchSchedule.service';
import { ItemService } from '../item/item.service';
import { JobService } from '../job/job.service';
import { SalesOrderTypeService } from '../salesOrderType/salesOrderType.service';

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
    routing
  ],
  declarations: [
    OrderInformation,
    OrderInformationTable
  ],
  providers: [
    DispatchScheduleService,
    CustomerService,
    JobService,
    ItemService,
    SalesOrderTypeService
  ]
})
export class OrderInformationModule { }
