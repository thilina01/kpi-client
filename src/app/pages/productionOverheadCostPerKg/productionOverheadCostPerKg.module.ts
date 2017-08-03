import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { ProductionOverheadCostPerKg } from './productionOverheadCostPerKg.component';
import { ProductionOverheadCostPerKgService } from '../../services/productionOverheadCostPerKg.service';
import { LossTypeService } from '../../services/lossType.service';
import { ProductionOverheadCostPerKgTable } from './components/productionOverheadCostPerKgTable/productionOverheadCostPerKgTable.component';
import { ProductionOverheadCostPerKgForm } from './components/productionOverheadCostPerKgForm/productionOverheadCostPerKgForm.component';

import { routing } from './productionOverheadCostPerKg.routing';


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
    ProductionOverheadCostPerKg,
    ProductionOverheadCostPerKgTable,
    ProductionOverheadCostPerKgForm
  ],
  providers: [ProductionOverheadCostPerKgService]
})
export class ProductionOverheadCostPerKgModule { }