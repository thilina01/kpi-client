import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule,PanelModule } from 'primeng/primeng';

import { LabourSource } from './labourSource.component';
import { LabourSourceService } from '../../services/labourSource.service';
import { LabourSourceTable } from './components/labourSourceTable/labourSourceTable.component';
import { LabourSourceForm } from './components/labourSourceForm/labourSourceForm.component';

import { routing } from './labourSource.routing';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
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
