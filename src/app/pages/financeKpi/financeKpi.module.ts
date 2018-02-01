import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
// import { MaterialModule } from '@angular/material';

import { FinanceKpi } from './financeKpi.component';
import { routing } from './financeKpi.routing';

import { PanelModule, TabViewModule } from 'primeng/primeng';

import { SalesPerKgChart } from './salesPerKgChart/salesPerKgChart.component';
import { MaterialCostPerKgChart } from './materialCostPerKgChart/materialCostPerKgChart.component';
import { ProductionOverheadCostPerKgChart } from './productionOverheadCostPerKgChart/productionOverheadCostPerKgChart.component';
import { ConsumableCostPerKgChart } from './consumableCostPerKgChart/consumableCostPerKgChart.component';
import { ElectricityCostPerKgChart } from './electricityCostPerKgChart/electricityCostPerKgChart.component';
import { ScrapCostPerKgChart } from './scrapCostPerKgChart/scrapCostPerKgChart.component';
import { LabourCostPerKgChart } from './labourCostPerKgChart/labourCostPerKgChart.component';
import { SalesPerKgChartService } from './salesPerKgChart/salesPerKgChart.service';
import { MaterialCostPerKgChartService } from './materialCostPerKgChart/materialCostPerKgChart.service';
import { ProductionOverheadCostPerKgChartService } from './productionOverheadCostPerKgChart/productionOverheadCostPerKgChart.service';
import { ConsumableCostPerKgChartService } from './consumableCostPerKgChart/consumableCostPerKgChart.service';
import { ElectricityCostPerKgChartService } from './electricityCostPerKgChart/electricityCostPerKgChart.service';
import { ScrapCostPerKgChartService } from './scrapCostPerKgChart/scrapCostPerKgChart.service';
import { LabourCostPerKgChartService } from './labourCostPerKgChart/labourCostPerKgChart.service';
import { ChartService } from '../chart/chart.service';
import { RevenueChart } from './revenueChart/revenueChart.component';
import { RevenueChartService } from './revenueChart/revenueChart.service';
import { EbitdaChartService } from './ebitdaChart/ebitdaChart.service';
import { EbitdaChart } from './ebitdaChart/ebitdaChart.component';
import { GrossProfitChart } from './grossProfitChart/grossProfitChart.component';
import { GrossProfitChartService } from './grossProfitChart/grossProfitChart.service';
import { NetProfitChart } from './netProfitChart/netProfitChart.component';
import { NetProfitChartService } from './netProfitChart/netProfitChart.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    // MaterialModule,
    PanelModule,
    TabViewModule,
    routing
  ],
  declarations: [
    SalesPerKgChart,
    MaterialCostPerKgChart,
    ProductionOverheadCostPerKgChart,
    ConsumableCostPerKgChart,
    ElectricityCostPerKgChart,
    ScrapCostPerKgChart,
    LabourCostPerKgChart,
    RevenueChart,
    EbitdaChart,
    GrossProfitChart,
    NetProfitChart,
    FinanceKpi
  ],
  providers: [
    SalesPerKgChartService,
    MaterialCostPerKgChartService,
    ProductionOverheadCostPerKgChartService,
    ConsumableCostPerKgChartService,
    ElectricityCostPerKgChartService,
    ScrapCostPerKgChartService,
    LabourCostPerKgChartService,
    RevenueChartService,
    EbitdaChartService,
    GrossProfitChartService,
    NetProfitChartService,
    ChartService
  ]
})
export class FinanceKpiModule { }
