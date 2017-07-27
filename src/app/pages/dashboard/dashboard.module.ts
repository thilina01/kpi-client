import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { MaterialModule } from '@angular/material';

import { Dashboard } from './dashboard.component';
import { routing } from './dashboard.routing';

import { PopularApp } from './popularApp';
import { PieChart } from './pieChart';
import { TrafficChart } from './trafficChart';
import { UsersMap } from './usersMap';
import { LineChart } from './lineChart';
import { Feed } from './feed';
import { Todo } from './todo';
import { Calendar } from './calendar';
import { CalendarService } from './calendar/calendar.service';
import { FeedService } from './feed/feed.service';
import { LineChartService } from './lineChart/lineChart.service';

import { AbsenteeismChart } from './absenteeismChart';
import { AbsenteeismChartService } from './absenteeismChart/absenteeismChart.service';
import { SalesWeightChart } from './salesWeightChart';
import { SalesWeightChartService } from './salesWeightChart/salesWeightChart.service';
import { ScrapChart } from './scrapChart';
import { ScrapChartService } from './scrapChart/scrapChart.service';
import { Scrap6MonthsChart } from './scrap6MonthsChart';
import { Scrap6MonthsChartService } from './scrap6MonthsChart/scrap6MonthsChart.service';
import { MtbfChart } from './mtbfChart';
import { MtbfChartService } from './mtbfChart/mtbfChart.service';
import { MttrChart } from './mttrChart';
import { MttrChartService } from './mttrChart/mttrChart.service';
import { KwhKvaMainChart } from './kwhKvaMainChart';
import { KwhKvaMainChartService } from './kwhKvaMainChart/kwhKvaMainChart.service';
import { EnergyCostMainChart } from './energyCostMainChart';
import { EnergyCostMainChartService } from './energyCostMainChart/energyCostMainChart.service';
import { DefectsBySectionChart } from './defectsBySectionChart';
import { DefectsBySectionChartService } from './defectsBySectionChart/defectsBySectionChart.service';
import { MdtChart } from './mdtChart';
import { MdtChartService } from './mdtChart/mdtChart.service';
import { Mdt6MonthsChart } from './mdt6MonthsChart';
import { Mdt6MonthsChartService } from './mdt6MonthsChart/mdt6MonthsChart.service';
import { Line5ReworksBarChart } from './line5ReworksBarChart';
import { Line5ReworksBarChartService } from './line5ReworksBarChart/line5ReworksBarChart.service';
import { DefectsLast3MonthsChart } from './defectsLast3MonthsChart';
import { DefectsLast3MonthsChartService } from './defectsLast3MonthsChart/defectsLast3MonthsChart.service';
import { DefectsLast6MonthsChart } from './defectsLast6MonthsChart';
import { DefectsLast6MonthsChartService } from './defectsLast6MonthsChart/defectsLast6MonthsChart.service';
import { Line5ReworksPieChart } from './line5ReworksPieChart';
import { Line5ReworksPieChartService } from './line5ReworksPieChart/line5ReworksPieChart.service';
import { LabourTurnoverChart } from './labourTurnoverChart';
import { LabourTurnoverChartService } from './labourTurnoverChart/labourTurnoverChart.service';
import { MtbfMttr6MonthsChart } from './mtbfmttr6monthsChart';
import { MtbfMttr6MonthsChartService } from './mtbfmttr6monthsChart/mtbfmttr6monthsChart.service';
import { ReworkScrapProductionChart } from './reworkScrapProductionChart';
import { ReworkScrapProductionChartService } from './reworkScrapProductionChart/reworkScrapProductionChart.service';
import { ScheduleAdherenceChart } from './scheduleAdherenceChart';
import { ScheduleAdherenceChartService } from './scheduleAdherenceChart/scheduleAdherenceChart.service';
import { ScheduleAdherenceThreeMonthsChart } from './scheduleAdherenceThreeMonthsChart';
import { ScheduleAdherenceThreeMonthsChartService } from './scheduleAdherenceThreeMonthsChart/scheduleAdherenceThreeMonthsChart.service';
import { ScheduleAdherenceFactorySixMonthsChart } from './scheduleAdherenceFactorySixMonthsChart';
import { ScheduleAdherenceFactorySixMonthsChartService } from './scheduleAdherenceFactorySixMonthsChart/scheduleAdherenceFactorySixMonthsChart.service';
import { PieChartService } from './pieChart/pieChart.service';
import { TodoService } from './todo/todo.service';
import { TrafficChartService } from './trafficChart/trafficChart.service';
import { UsersMapService } from './usersMap/usersMap.service';
import { ChartService } from '../../services/chart.service'
import { SalesValueChart } from './salesValueChart';
import { SalesValueChartService } from './salesValueChart/salesValueChart.service';
import { ConsumableCostPerKgChart } from './consumableCostPerKgChart';
import { ConsumableCostPerKgChartService } from './consumableCostPerKgChart/consumableCostPerKgChart.service';
import { CumulativeSalesPerKgChart } from './cumulativeSalesPerKgChart';
import { CumulativeSalesPerKgChartService } from './cumulativeSalesPerKgChart/cumulativeSalesPerKgChart.service';
import { ElectricityCostPerKgChart } from "./electricityCostPerKgChart";
import { LabourCostPerKgChart } from "./labourCostPerKgChart";
import { MaterialCostPerKgChart } from "./materialCostPerKgChart";
import { ProductionOverheadCostPerKgChart } from "./productionOverheadCostPerKgChart";
import { SalesPerKgChart } from "./salesPerKgChart";
import { ElectricityCostPerKgChartService } from "./electricityCostPerKgChart/electricityCostPerKgChart.service";
import { LabourCostPerKgChartService } from "./labourCostPerKgChart/labourCostPerKgChart.service";
import { MaterialCostPerKgChartService } from "./materialCostPerKgChart/materialCostPerKgChart.service";
import { ProductionOverheadCostPerKgChartService } from "./productionOverheadCostPerKgChart/productionOverheadCostPerKgChart.service";
import { SalesPerKgChartService } from "./salesPerKgChart/salesPerKgChart.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    MaterialModule,
    routing
  ],
  declarations: [
    PopularApp,
    PieChart,
    TrafficChart,
    UsersMap,
    LineChart,
    AbsenteeismChart,
    ScrapChart,
    MtbfChart,
    MttrChart,
    MdtChart,
    KwhKvaMainChart,
    EnergyCostMainChart,
    DefectsLast3MonthsChart,
    DefectsLast6MonthsChart,
    Scrap6MonthsChart,
    Mdt6MonthsChart,
    DefectsBySectionChart,
    SalesWeightChart,
    ConsumableCostPerKgChart,
    CumulativeSalesPerKgChart,
    ElectricityCostPerKgChart,
    LabourCostPerKgChart,
    MaterialCostPerKgChart,
    ProductionOverheadCostPerKgChart,
    SalesPerKgChart,
    SalesValueChart,
    MtbfMttr6MonthsChart,
    Line5ReworksBarChart,
    Line5ReworksPieChart,
    LabourTurnoverChart,
    ScheduleAdherenceChart,
    ReworkScrapProductionChart,
    ScheduleAdherenceThreeMonthsChart,
    ScheduleAdherenceFactorySixMonthsChart,
    Feed,
    Todo,
    Calendar,
    Dashboard
  ],
  providers: [
    CalendarService,
    FeedService,
    LineChartService,
    AbsenteeismChartService,
    ScrapChartService,
    MtbfChartService,
    MttrChartService,
    MdtChartService,
    KwhKvaMainChartService,
    SalesWeightChartService,
    ConsumableCostPerKgChartService,
    CumulativeSalesPerKgChartService,
    ElectricityCostPerKgChartService,
    LabourCostPerKgChartService,
    MaterialCostPerKgChartService,
    ProductionOverheadCostPerKgChartService,
    SalesPerKgChartService,
    SalesValueChartService,
    Scrap6MonthsChartService,
    Mdt6MonthsChartService,
    DefectsBySectionChartService,
    EnergyCostMainChartService,
    MtbfMttr6MonthsChartService,
    DefectsLast3MonthsChartService,
    DefectsLast6MonthsChartService,
    Line5ReworksBarChartService,
    Line5ReworksPieChartService,
    LabourTurnoverChartService,
    ScheduleAdherenceChartService,
    ReworkScrapProductionChartService,
    ScheduleAdherenceThreeMonthsChartService,
    ScheduleAdherenceFactorySixMonthsChartService,
    PieChartService,
    TodoService,
    TrafficChartService,
    UsersMapService,
    ChartService
  ]
})
export class DashboardModule { }
