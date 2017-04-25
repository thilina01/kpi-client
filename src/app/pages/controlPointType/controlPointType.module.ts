import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule } from 'primeng/primeng';

import { ControlPointType } from './controlPointType.component';
import { ControlPointTypeService } from '../../services/controlPointType.service';
import { WorkCenterService } from '../../services/workCenter.service';
import { ControlPointTypeTable } from './components/controlPointTypeTable/controlPointTypeTable.component';
import { ControlPointTypeForm } from './components/controlPointTypeForm/controlPointTypeForm.component';

import { routing } from './controlPointType.routing';


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
