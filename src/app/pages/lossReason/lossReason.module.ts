import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule,PanelModule } from 'primeng/primeng';

import { LossReason } from './lossReason.component';
import { LossReasonService } from '../../services/lossReason.service';
import { LossReasonTable } from './components/lossReasonTable/lossReasonTable.component';
import { LossReasonForm } from './components/lossReasonForm/lossReasonForm.component';

import { routing } from './lossReason.routing';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    routing
  ],
  declarations: [
    LossReason,
    LossReasonTable,
    LossReasonForm
  ],
  providers: [
    LossReasonService
  ]
})
export class LossReasonModule { }
