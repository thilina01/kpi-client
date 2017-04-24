import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule } from 'primeng/primeng';

import { ControlPoint } from './controlPoint.component';
import { ControlPointService } from '../../services/controlPoint.service';
import { ControlPointTypeService } from '../../services/controlPointType.service';
import { WorkCenterService } from '../../services/workCenter.service';
import { ControlPointTable } from './components/controlPointTable/controlPointTable.component';
import { ControlPointForm } from './components/controlPointForm/controlPointForm.component';

import { routing } from './controlPoint.routing';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
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
