import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, AutoCompleteModule, CalendarModule } from 'primeng/primeng';

import { LossReason } from './lossReason.component';
import { LossReasonTable } from './components/lossReasonTable/lossReasonTable.component';
import { LossReasonForm } from './components/lossReasonForm/lossReasonForm.component';

import { routing } from './lossReason.routing';
import { LossReasonService } from './lossReason.service';
import { LossType } from '../lossType/lossType.component';
import { LossTypeService } from '../lossType/lossType.service';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    AutoCompleteModule,
    InputTextModule,
    CalendarModule,
    routing
  ],
  declarations: [
    LossReason,
    LossReasonTable,
    LossReasonForm
  ],
  providers: [
    LossReasonService,
    LossTypeService
  ]
})
export class LossReasonModule { }
