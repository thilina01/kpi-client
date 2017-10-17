import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { ControlPointType } from './controlPointType.component';
import { ControlPointTypeTable } from './components/controlPointTypeTable/controlPointTypeTable.component';
import { ControlPointTypeForm } from './components/controlPointTypeForm/controlPointTypeForm.component';

import { routing } from './controlPointType.routing';
import { ControlPointTypeService } from './controlPointType.service';
import { WorkCenterService } from '../workCenter/workCenter.service';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    CalendarModule,
    InputTextModule,
    routing
  ],
  declarations: [
    ControlPointType,
    ControlPointTypeTable,
    ControlPointTypeForm
  ],
  providers: [
    ControlPointTypeService,
    WorkCenterService
  ]
})
export class ControlPointTypeModule { }
