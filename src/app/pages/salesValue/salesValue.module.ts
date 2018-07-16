import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { SalesValue } from './salesValue.component';
import { SalesValueTable } from './components/salesValueTable/salesValueTable.component';
import { SalesValueForm } from './components/salesValueForm/salesValueForm.component';

import { routing } from './salesValue.routing';
import { LabourSourceService } from '../labourSource/labourSource.service';
import { SalesValueService } from './salesValue.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    SharedModule,
    PanelModule,
    InputTextModule,
    routing
  ],
  declarations: [
    SalesValue,
    SalesValueTable,
    SalesValueForm
  ],
  providers: [SalesValueService, LabourSourceService]
})
export class SalesValueModule { }
