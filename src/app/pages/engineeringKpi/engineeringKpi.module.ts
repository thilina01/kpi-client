import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { MaterialModule } from '@angular/material';

import { EngineeringKpi } from './engineeringKpi.component';
import { routing } from './engineeringKpi.routing';


import { PanelModule, TabViewModule } from 'primeng/primeng';
import { ChartService } from '../chart/chart.service';
import { EnergyCostMainChartService } from './energyCostMainChart/energyCostMainChart.service';
import { EnergyCostMainChart } from './energyCostMainChart/energyCostMainChart.component';
import { KwhKvaMainChartService } from './kwhKvaMainChart/kwhKvaMainChart.service';
import { KwhKvaMainChart } from './kwhKvaMainChart/kwhKvaMainChart.component';
import { Mdt6MonthsChart } from './mdt6MonthsChart/mdt6MonthsChart.component';
import { Mdt6MonthsChartService } from './mdt6MonthsChart/mdt6MonthsChart.service';
import { MtbfMttr6MonthsChartService } from './mtbfmttr6monthsChart/mtbfmttr6monthsChart.service';
import { MtbfMttr6MonthsChart } from './mtbfmttr6monthsChart/mtbfmttr6monthsChart.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    MaterialModule,
    PanelModule,
    TabViewModule,
    routing
  ],
  declarations: [
    EnergyCostMainChart,
    KwhKvaMainChart,
    Mdt6MonthsChart,
    MtbfMttr6MonthsChart,
    EngineeringKpi
  ],
  providers: [
    EnergyCostMainChartService,
    KwhKvaMainChartService,
    Mdt6MonthsChartService,
    MtbfMttr6MonthsChartService,
    ChartService
  ]
})
export class EngineeringKpiModule { }
