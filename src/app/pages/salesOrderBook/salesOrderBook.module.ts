import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule, AutoCompleteModule } from 'primeng/primeng';
import { SalesOrderBook } from './salesOrderBook.component';
import { SalesOrderBookTable } from './components/salesOrderBookTable/salesOrderBookTable.component';

import { routing } from './salesOrderBook.routing';
import { CustomerService } from '../customer/customer.service';
import { DispatchScheduleService } from '../dispatchSchedule/dispatchSchedule.service';
import { ItemService } from '../item/item.service';
import { SalesOrderItemService } from '../../services/salesOrderItem.service';
import { SalesOrderService } from '../salesOrder/salesOrder.service';
import { CustomerItemService } from '../customerItem/customerItem.service';

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
    SalesOrderBook,
    SalesOrderBookTable
  ],
  providers: [
    SalesOrderItemService,
    DispatchScheduleService,
    CustomerService,
    CustomerItemService,
    SalesOrderService,
  ]
})
export class SalesOrderBookModule { }
