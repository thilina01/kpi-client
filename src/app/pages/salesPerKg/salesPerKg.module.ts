import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { SalesPerKg } from './salesPerKg.component';
import { SalesPerKgService } from '../../services/salesPerKg.service';
import { LossTypeService } from '../../services/lossType.service';
import { SalesPerKgTable } from './components/salesPerKgTable/salesPerKgTable.component';
import { SalesPerKgForm } from './components/salesPerKgForm/salesPerKgForm.component';

import { routing } from './salesPerKg.routing';


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
    SalesPerKg,
    SalesPerKgTable,
    SalesPerKgForm
  ],
  providers: [SalesPerKgService]
})
export class SalesPerKgModule { }
