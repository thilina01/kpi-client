import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { FinanceSummary } from './financeSummary.component';
import { LossTypeService } from '../../services/lossType.service';
import { FinanceSummaryTable } from './components/financeSummaryTable/financeSummaryTable.component';
import { FinanceSummaryForm } from './components/financeSummaryForm/financeSummaryForm.component';

import { routing } from './financeSummary.routing';
import { FinanceSummaryService } from './financeSummary.service';


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
    routing
  ],
  declarations: [
    FinanceSummary,
    FinanceSummaryTable,
    FinanceSummaryForm
  ],
  providers: [FinanceSummaryService]
})
export class FinanceSummaryModule { }
