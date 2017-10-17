import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { LabourSource } from './labourSource.component';
import { LabourSourceTable } from './components/labourSourceTable/labourSourceTable.component';
import { LabourSourceForm } from './components/labourSourceForm/labourSourceForm.component';

import { routing } from './labourSource.routing';
import { LabourSourceService } from './labourSource.service';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    InputTextModule,
    CalendarModule,
    routing
  ],
  declarations: [
    LabourSource,
    LabourSourceTable,
    LabourSourceForm
  ],
  providers: [
    LabourSourceService
  ]
})
export class LabourSourceModule { }
