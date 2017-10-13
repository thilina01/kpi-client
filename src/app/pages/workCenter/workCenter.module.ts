import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, AutoCompleteModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { WorkCenter } from './workCenter.component';
import { WorkCenterTable } from './components/workCenterTable/workCenterTable.component';
import { WorkCenterForm } from './components/workCenterForm/workCenterForm.component';

import { routing } from './workCenter.routing';
import { CostCenterService } from '../costCenter/costCenter.service';
import { WorkCenterService } from './workCenter.service';




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
    CalendarModule,
    routing
  ],
  declarations: [
    WorkCenter,
    WorkCenterTable,
    WorkCenterForm
  ],
  providers: [
    WorkCenterService,
    CostCenterService
  ]
})
export class WorkCenterModule { }
