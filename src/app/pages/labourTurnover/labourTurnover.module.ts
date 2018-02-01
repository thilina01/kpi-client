import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MaterialModule } from '@angular/material';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, AutoCompleteModule, InputTextModule } from 'primeng/primeng';

import { LabourTurnover } from './labourTurnover.component';
import { LossTypeService } from '../../services/lossType.service';
import { LabourTurnoverTable } from './components/labourTurnoverTable/labourTurnoverTable.component';
import { LabourTurnoverForm } from './components/labourTurnoverForm/labourTurnoverForm.component';

import { routing } from './labourTurnover.routing';
import { LabourSourceService } from '../labourSource/labourSource.service';
import { LabourTurnoverService } from './labourTurnover.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    // MaterialModule,
    SharedModule,
    PanelModule,
    AutoCompleteModule,
    InputTextModule,
    routing
  ],
  declarations: [
    LabourTurnover,
    LabourTurnoverTable,
    LabourTurnoverForm
  ],
  providers: [LabourTurnoverService, LabourSourceService]
})
export class LabourTurnoverModule { }
