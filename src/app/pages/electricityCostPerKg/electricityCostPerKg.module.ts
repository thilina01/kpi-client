import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { ElectricityCostPerKg } from './electricityCostPerKg.component';

import { LossTypeService } from '../../services/lossType.service';
import { ElectricityCostPerKgTable } from './components/electricityCostPerKgTable/electricityCostPerKgTable.component';
import { ElectricityCostPerKgForm } from './components/electricityCostPerKgForm/electricityCostPerKgForm.component';

import { routing } from './electricityCostPerKg.routing';
import { ElectricityCostPerKgService } from './electricityCostPerKg.service';

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
    ElectricityCostPerKg,
    ElectricityCostPerKgTable,
    ElectricityCostPerKgForm
  ],
  providers: [ElectricityCostPerKgService]
})
export class ElectricityCostPerKgModule { }
