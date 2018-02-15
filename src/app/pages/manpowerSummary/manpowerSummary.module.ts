import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule, AutoCompleteModule, ChartModule, OverlayPanelModule } from 'primeng/primeng';
import { ManpowerSummary } from './manpowerSummary.component';
import { ManpowerSummaryTable } from './components/manpowerSummaryTable/manpowerSummaryTable.component';

import { routing } from './manpowerSummary.routing';
import { SectionService } from '../section/section.service';
import { ManpowerSummaryService } from './manpowerSummary.service';
import { ShiftService } from '../shift/shift.service';
import { EmployeeService } from '../employee/employee.service';
import { ProductionService } from '../production/production.service';
import { ResourceUtilizationService } from '../resourceUtilization/resourceUtilization.service';
import { ChartService } from '../chart/chart.service';
import { ManpowerSummaryChart } from './components/manpowerSummaryChart';

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
    AutoCompleteModule,
    ChartModule,
    OverlayPanelModule,
    routing
  ],
  declarations: [
    ManpowerSummary,
    ManpowerSummaryTable,
    ManpowerSummaryChart
  ],
  providers: [
    ManpowerSummaryService,
    ChartService,
    ResourceUtilizationService,
    SectionService,
    ShiftService,
    EmployeeService,
    ProductionService
  ]
})
export class ManpowerSummaryModule { }
