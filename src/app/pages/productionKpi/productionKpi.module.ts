import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { MaterialModule } from '@angular/material';

import { ProductionKpi } from './productionKpi.component';
import { routing } from './productionKpi.routing';

import { PanelModule, AutoCompleteModule, TabViewModule } from 'primeng/primeng';

import { ScheduleAdherenceFactorySixMonthsChart } from './scheduleAdherenceFactorySixMonthsChart/scheduleAdherenceFactorySixMonthsChart.component';
import { ScheduleAdherenceFactorySixMonthsChartService } from './scheduleAdherenceFactorySixMonthsChart/scheduleAdherenceFactorySixMonthsChart.service';
import { ChartService } from '../chart/chart.service';
import { OnTimeDeliveryChart } from './onTimeDeliveryChart/onTimeDeliveryChart.component';
import { OnTimeDeliveryChartService } from './onTimeDeliveryChart/onTimeDeliveryChart.service';
import { CustomerService } from '../customer/customer.service';
import { ScrapValueChartService } from './scrapValueChart/scrapValueChart.service';
import { ScrapValueChart } from './scrapValueChart/scrapValueChart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    MaterialModule,
    PanelModule,
    TabViewModule,
    AutoCompleteModule,
    routing
  ],
  declarations: [
    ScheduleAdherenceFactorySixMonthsChart,
    OnTimeDeliveryChart,
    ScrapValueChart,
    ProductionKpi
  ],
  providers: [
    ScheduleAdherenceFactorySixMonthsChartService,
    OnTimeDeliveryChartService,
    ScrapValueChartService,
    ChartService,
    CustomerService
  ]
})
export class ProductionKpiModule { }
