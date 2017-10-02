import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, PanelModule, TabViewModule, CalendarModule, AutoCompleteModule, InputTextModule } from 'primeng/primeng';
import { DispatchSchedule } from './dispatchSchedule.component';
import { DispatchScheduleTable } from './components/dispatchScheduleTable/dispatchScheduleTable.component';
import { DispatchScheduleForm } from './components/dispatchScheduleForm/dispatchScheduleForm.component';

import { routing } from './dispatchSchedule.routing';
import { ItemService } from "../item/item.service";
import { DispatchScheduleService } from "./dispatchSchedule.service";
import { OperationService } from "../operation/operation.service";
import { CustomerItemService } from "../customerItem/customerItem.service";
import { CustomerPoNumberService } from "../customerPoNumber/customerPoNumber.service";
import { SalesOrderService } from "../salesOrder/salesOrder.service";
import { JobService } from "../job/job.service";
import { Print } from './components/dispatchSchedulePrint/print.component';
import { PrintService } from '../../services/print.service';
import { DispatchNoteService } from '../dispatchNote/dispatchNote.service';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    TabViewModule,
    CalendarModule,
    AutoCompleteModule,
    InputTextModule,
    DialogModule,
    routing
  ],
  declarations: [
    DispatchSchedule,
    DispatchScheduleTable,
    DispatchScheduleForm,
    Print
  ],
  providers: [
    DispatchScheduleService,
    ItemService,
    CustomerItemService,
    SalesOrderService,
    JobService,
    PrintService,
    OperationService,
    DispatchNoteService
  ]
})
export class DispatchScheduleModule { }
