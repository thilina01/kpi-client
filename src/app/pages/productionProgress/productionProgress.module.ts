import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule, AutoCompleteModule } from 'primeng/primeng';

import { ProductionProgress } from './productionProgress.component';
import { ProductionProgressTable } from './components/productionProgressTable/productionProgressTable.component';
import { ProductionProgressForm } from './components/productionProgressForm/productionProgressForm.component';

import { routing } from './productionProgress.routing';
import { ProductionProgressService } from './productionProgress.service';
import { OperationService } from '../operation/operation.service';

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
    AutoCompleteModule,
    routing
  ],
  declarations: [
    ProductionProgress,
    ProductionProgressTable,
    ProductionProgressForm
  ],
  providers: [
    ProductionProgressService,
    OperationService
  ]
})
export class ProductionProgressModule { }
