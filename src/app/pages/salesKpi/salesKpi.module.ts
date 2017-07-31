import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { MaterialModule } from '@angular/material';

import { SalesKpi } from './salesKpi.component';
import { routing } from './salesKpi.routing';


import { SalesWeightChart } from './salesWeightChart';
import { SalesWeightChartService } from './salesWeightChart/salesWeightChart.service';
import { ChartService } from '../../services/chart.service'
import { SalesValueChart } from './salesValueChart';
import { SalesValueChartService } from './salesValueChart/salesValueChart.service';
import { PanelModule } from "primeng/primeng";

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
    SalesWeightChart,
    SalesValueChart,
    SalesKpi
  ],
  providers: [
    SalesWeightChartService,
    SalesValueChartService,
    ChartService
  ]
})
export class SalesKpiModule { }
