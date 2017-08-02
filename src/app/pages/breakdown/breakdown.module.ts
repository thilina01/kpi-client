import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule,AutoCompleteModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { Breakdown } from './breakdown.component';
import { BreakdownService } from '../../services/breakdown.service';
import { MachineService } from '../../services/machine.service';
import { LossTypeService } from '../../services/lossType.service';
import { BreakdownTable } from './components/breakdownTable/breakdownTable.component';
import { BreakdownForm } from './components/breakdownForm/breakdownForm.component';

import { routing } from './breakdown.routing';


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
    AutoCompleteModule,
    routing
  ],
  declarations: [
    Breakdown,
    BreakdownTable,
    BreakdownForm
  ],
  providers: [BreakdownService, MachineService]
})
export class BreakdownModule { }
