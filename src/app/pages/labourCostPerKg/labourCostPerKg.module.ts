import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { LabourCostPerKg } from './labourCostPerKg.component';
import { LossTypeService } from '../../services/lossType.service';
import { LabourCostPerKgTable } from './components/labourCostPerKgTable/labourCostPerKgTable.component';
import { LabourCostPerKgForm } from './components/labourCostPerKgForm/labourCostPerKgForm.component';

import { routing } from './labourCostPerKg.routing';
import { LabourCostPerKgService } from "./labourCostPerKg.service";


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
    LabourCostPerKg,
    LabourCostPerKgTable,
    LabourCostPerKgForm
  ],
  providers: [
    LabourCostPerKgService
  ]
})
export class LabourCostPerKgModule { }
