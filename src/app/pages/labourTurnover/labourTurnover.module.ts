import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { LabourTurnover } from './labourTurnover.component';
import { LabourTurnoverService } from '../../services/labourTurnover.service';
import { LabourSourceService } from '../../services/labourSource.service';
import { LossTypeService } from '../../services/lossType.service';
import { LabourTurnoverTable } from './components/labourTurnoverTable/labourTurnoverTable.component';
import { LabourTurnoverForm } from './components/labourTurnoverForm/labourTurnoverForm.component';

import { routing } from './labourTurnover.routing';


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
