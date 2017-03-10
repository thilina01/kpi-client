import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { Production } from './production.component';
import { ProductionService } from '../../services/production.service';
import { ShiftService } from '../../services/shift.service';
import { ControlPointService } from '../../services/controlPoint.service';
import { ProductionTable } from './components/productionTable/productionTable.component';
import { ProductionForm } from './components/productionForm/productionForm.component';

import { routing } from './production.routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    MaterialModule.forRoot(),
    SharedModule,
    routing
  ],
  declarations: [
    Production,
    ProductionTable,
    ProductionForm
  ],
  providers: [ProductionService,ShiftService,ControlPointService]
})
export class ProductionModule { }
