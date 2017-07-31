import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { MaterialModule } from '@angular/material';

import { ProductionKpi } from './productionKpi.component';
import { routing } from './productionKpi.routing';


import { ChartService } from '../../services/chart.service'
import { PanelModule } from "primeng/primeng";
import { ScheduleAdherenceFactorySixMonthsChart } from "./scheduleAdherenceFactorySixMonthsChart/scheduleAdherenceFactorySixMonthsChart.component";
import { ScheduleAdherenceFactorySixMonthsChartService } from "./scheduleAdherenceFactorySixMonthsChart/scheduleAdherenceFactorySixMonthsChart.service";

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
    ScheduleAdherenceFactorySixMonthsChart,
    ProductionKpi
  ],
  providers: [
    ScheduleAdherenceFactorySixMonthsChartService,
    ChartService
  ]
})
export class ProductionKpiModule { }
