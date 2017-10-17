import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { MaterialCostPerKg } from './materialCostPerKg.component';
import { LossTypeService } from '../../services/lossType.service';
import { MaterialCostPerKgTable } from './components/materialCostPerKgTable/materialCostPerKgTable.component';
import { MaterialCostPerKgForm } from './components/materialCostPerKgForm/materialCostPerKgForm.component';

import { routing } from './materialCostPerKg.routing';
import { MaterialCostPerKgService } from './materialCostPerKg.service';

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
    MaterialCostPerKg,
    MaterialCostPerKgTable,
    MaterialCostPerKgForm
  ],
  providers: [MaterialCostPerKgService]
})
export class MaterialCostPerKgModule { }
