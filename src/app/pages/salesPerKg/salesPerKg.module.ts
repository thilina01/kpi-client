import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { SalesPerKg } from './salesPerKg.component';
import { LossTypeService } from '../../services/lossType.service';
import { SalesPerKgTable } from './components/salesPerKgTable/salesPerKgTable.component';
import { SalesPerKgForm } from './components/salesPerKgForm/salesPerKgForm.component';

import { routing } from './salesPerKg.routing';
import { SalesPerKgService } from './salesPerKg.service';

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
    SalesPerKg,
    SalesPerKgTable,
    SalesPerKgForm
  ],
  providers: [SalesPerKgService]
})
export class SalesPerKgModule { }
