import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { MaterialModule } from '@angular/material';

import { HumanResourceKpi } from './humanResourceKpi.component';
import { routing } from './humanResourceKpi.routing';


import { PanelModule } from "primeng/primeng";
import { AbsenteeismChart } from "./absenteeismChart/absenteeismChart.component";
import { LabourTurnoverChart } from "./labourTurnoverChart/labourTurnoverChart.component";
import { AbsenteeismChartService } from "./absenteeismChart/absenteeismChart.service";
import { LabourTurnoverChartService } from "./labourTurnoverChart/labourTurnoverChart.service";
import { ChartService } from "../chart/chart.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    MaterialModule,
    PanelModule,
    routing
  ],
  declarations: [
    AbsenteeismChart,
    LabourTurnoverChart,
    HumanResourceKpi
  ],
  providers: [
    AbsenteeismChartService,
    LabourTurnoverChartService,
    ChartService
  ]
})
export class HumanResourceKpiModule { }
