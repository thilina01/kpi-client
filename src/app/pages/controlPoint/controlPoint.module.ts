import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, AutoCompleteModule, InputTextModule } from 'primeng/primeng';

import { ControlPointTypeService } from '../../services/controlPointType.service';
import { WorkCenterService } from '../../services/workCenter.service';
import { ControlPointTable } from './components/controlPointTable/controlPointTable.component';
import { ControlPointForm } from './components/controlPointForm/controlPointForm.component';

import { routing } from './controlPoint.routing';
import { ControlPoint } from "./controlPoint.component";
import { ControlPointService } from "./controlPoint.service";


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    AutoCompleteModule,
     InputTextModule,
    routing
  ],
  declarations: [
    ControlPoint,
    ControlPointTable,
    ControlPointForm
  ],
  providers: [
    ControlPointService,
    ControlPointTypeService,
    WorkCenterService
  ]
})
export class ControlPointModule { }
