import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { ProductionOverheadCostPerKg } from './productionOverheadCostPerKg.component';
import { LossTypeService } from '../../services/lossType.service';
import { ProductionOverheadCostPerKgTable } from './components/productionOverheadCostPerKgTable/productionOverheadCostPerKgTable.component';
import { ProductionOverheadCostPerKgForm } from './components/productionOverheadCostPerKgForm/productionOverheadCostPerKgForm.component';

import { routing } from './productionOverheadCostPerKg.routing';
import { ProductionOverheadCostPerKgService } from './productionOverheadCostPerKg.service';

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
    ProductionOverheadCostPerKg,
    ProductionOverheadCostPerKgTable,
    ProductionOverheadCostPerKgForm
  ],
  providers: [ProductionOverheadCostPerKgService]
})
export class ProductionOverheadCostPerKgModule { }
