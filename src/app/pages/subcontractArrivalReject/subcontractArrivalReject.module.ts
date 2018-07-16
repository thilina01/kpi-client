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

import { SubcontractArrivalReject } from './subcontractArrivalReject.component';
import { SubcontractArrivalRejectTable } from './components/subcontractArrivalRejectTable/subcontractArrivalRejectTable.component';
import { SubcontractArrivalRejectForm } from './components/subcontractArrivalRejectForm/subcontractArrivalRejectForm.component';

import { routing } from './subcontractArrivalReject.routing';
import { SubcontractArrivalRejectService } from './subcontractArrivalReject.service';
import { LossReasonService } from '../lossReason/lossReason.service';
import { SubcontractArrivalService } from '../subcontractArrival/subcontractArrival.service';

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
    AutoCompleteModule,
    InputTextModule,
    routing
  ],
  declarations: [
    SubcontractArrivalReject,
    SubcontractArrivalRejectTable,
    SubcontractArrivalRejectForm
  ],
  providers: [
    SubcontractArrivalRejectService,
    LossReasonService,
    SubcontractArrivalService
  ]
})
export class SubcontractArrivalRejectModule {}
