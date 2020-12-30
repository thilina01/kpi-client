import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule, AutoCompleteModule,
  DropdownModule, ChartModule, ProgressBarModule, OverlayPanelModule
} from 'primeng/primeng';
import { OperationProgress } from './operationProgress.component';
import { OperationProgressTable } from './components/operationProgressTable/operationProgressTable.component';
import { OperationProgressForm } from './components/operationProgressForm/operationProgressForm.component';

import { routing } from './operationProgress.routing';
import { OperationProgressService } from './operationProgress.service';
import { OperationService } from '../operation/operation.service';
import { SectionService } from '../section/section.service';
import { ControlPointService } from '../controlPoint/controlPoint.service';
import { JobService } from '../job/job.service';
import { OperationProgressSummary } from './components/operationProgressSummary/operationProgressSummary.component';
import { ChartService } from '../chart/chart.service';
import {ShiftService} from "../shift/shift.service";

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
    AutoCompleteModule,
    DropdownModule,
    ChartModule,
    ProgressBarModule,
    OverlayPanelModule,
    routing
  ],
  declarations: [
    OperationProgress,
    OperationProgressTable,
    OperationProgressForm,
    OperationProgressSummary
  ],
  providers: [
    OperationProgressService,
    OperationService,
    SectionService,
    ShiftService,
    ControlPointService,
    JobService,
    ChartService

  ]
})
export class OperationProgressModule { }
