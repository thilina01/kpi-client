import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule, AutoCompleteModule, InputTextModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { Breakdown } from './breakdown.component';
import { LossTypeService } from '../../services/lossType.service';
import { BreakdownTable } from './components/breakdownTable/breakdownTable.component';
import { BreakdownForm } from './components/breakdownForm/breakdownForm.component';

import { routing } from './breakdown.routing';
import { BreakdownService } from './breakdown.service';
import { MachineService } from '../machine/machine.service';


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
    InputTextModule,
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
