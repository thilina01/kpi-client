import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { SalesValue } from './salesValue.component';
import { SalesValueService } from '../../services/salesValue.service';
import { LabourSourceService } from '../../services/labourSource.service';
import { LossTypeService } from '../../services/lossType.service';
import { SalesValueTable } from './components/salesValueTable/salesValueTable.component';
import { SalesValueForm } from './components/salesValueForm/salesValueForm.component';

import { routing } from './salesValue.routing';


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
    SalesValue,
    SalesValueTable,
    SalesValueForm
  ],
  providers: [SalesValueService, LabourSourceService]
})
export class SalesValueModule { }
