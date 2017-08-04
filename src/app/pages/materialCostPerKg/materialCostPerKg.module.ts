import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { MaterialCostPerKg } from './materialCostPerKg.component';
import { MaterialCostPerKgService } from '../../services/materialCostPerKg.service';
import { LossTypeService } from '../../services/lossType.service';
import { MaterialCostPerKgTable } from './components/materialCostPerKgTable/materialCostPerKgTable.component';
import { MaterialCostPerKgForm } from './components/materialCostPerKgForm/materialCostPerKgForm.component';

import { routing } from './materialCostPerKg.routing';


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
