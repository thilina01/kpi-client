import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DataTableModule,
  SharedModule,
  DialogModule,
  CalendarModule,
  PanelModule,
  InputTextModule,
  AutoCompleteModule
} from 'primeng/primeng';

import { DispatchReject } from './dispatchReject.component';
import { DispatchRejectTable } from './components/dispatchRejectTable/dispatchRejectTable.component';
import { DispatchRejectForm } from './components/dispatchRejectForm/dispatchRejectForm.component';

import { routing } from './dispatchReject.routing';
import { DispatchRejectService } from './dispatchReject.service';
import { LoadingPlanItemService } from '../../services/loadingPlanItem.service';
import { DispatchNoteService } from '../dispatchNote/dispatchNote.service';
import { ItemService } from '../item/item.service';
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
    SharedModule,
    PanelModule,
    InputTextModule,
    AutoCompleteModule,
    routing
  ],
  declarations: [DispatchReject, DispatchRejectTable, DispatchRejectForm],
  providers: [
    DispatchRejectService,
    LoadingPlanItemService,
    DispatchRejectService,
    DispatchNoteService,
    CustomerService,
    ItemService
  ]
})
export class DispatchRejectModule {}
