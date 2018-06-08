import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule, TabViewModule } from 'primeng/primeng';
// import { MaterialModule } from '@angular/material';

import { FinanceSummary } from './financeSummary.component';
import { LossTypeService } from '../../services/lossType.service';
import { FinanceSummaryTable } from './components/financeSummaryTable/financeSummaryTable.component';
import { FinanceSummaryForm } from './components/financeSummaryForm/financeSummaryForm.component';

import { routing } from './financeSummary.routing';
import { FinanceSummaryService } from './financeSummary.service';
import { ChartService } from '../chart/chart.service';
import { FinanceSummaryChart } from './components/financeSummaryChart';
import { RevenueChart } from './components/financeSummaryChart/revenueChart/revenueChart.component';
import { EbitdaChart } from './components/financeSummaryChart/ebitdaChart/ebitdaChart.component';
import { GrossProfitChart } from './components/financeSummaryChart/grossProfitChart/grossProfitChart.component';
import { NetProfitChart } from './components/financeSummaryChart/netProfitChart/netProfitChart.component';
import { RevenueChartService } from './components/financeSummaryChart/revenueChart/revenueChart.service';
import { EbitdaChartService } from './components/financeSummaryChart/ebitdaChart/ebitdaChart.service';
import { GrossProfitChartService } from './components/financeSummaryChart/grossProfitChart/grossProfitChart.service';
import { NetProfitChartService } from './components/financeSummaryChart/netProfitChart/netProfitChart.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    // MaterialModule,
    SharedModule,
    PanelModule,
    InputTextModule,
    TabViewModule,
    routing
  ],
  declarations: [
    FinanceSummary,
    FinanceSummaryTable,
    FinanceSummaryForm,
    FinanceSummaryChart,
    RevenueChart,
    EbitdaChart,
    GrossProfitChart,
    NetProfitChart
  ],
  providers: [
    FinanceSummaryService,
    ChartService,
    RevenueChartService,
    EbitdaChartService,
    GrossProfitChartService,
    NetProfitChartService,
  ]
})
export class FinanceSummaryModule { }
