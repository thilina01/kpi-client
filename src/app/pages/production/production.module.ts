import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule,PanelModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { Production } from './production.component';
import { ProductionService } from '../../services/production.service';
import { ShiftService } from '../../services/shift.service';
import { LossTypeService } from '../../services/lossType.service';
import { ProductionTable } from './components/productionTable/productionTable.component';
import { ProductionForm } from './components/productionForm/productionForm.component';

import { routing } from './production.routing';
import { ControlPointService } from "../controlPoint/controlPoint.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    PanelModule,
    MaterialModule,
    SharedModule,
    routing
  ],
  declarations: [
    Production,
    ProductionTable,
    ProductionForm
  ],
  providers: [ProductionService, ShiftService, ControlPointService, LossTypeService]
})
export class ProductionModule { }
