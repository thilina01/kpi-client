import { Component } from '@angular/core';

import { ProductionOverheadCostPerKgChartService } from './productionOverheadCostPerKgChart.service';


import 'style-loader!./productionOverheadCostPerKgChart.scss';
import { ChartService } from '../../chart/chart.service';

@Component({
  selector: 'production-overhead-cost-per-kg-chart',
  templateUrl: './productionOverheadCostPerKgChart.html'
})
export class ProductionOverheadCostPerKgChart {

  amChart: any;
  chartData: any;

  constructor(private _productionOverheadCostPerKgChartService: ProductionOverheadCostPerKgChartService, private chartService: ChartService) {

    this.chartData = this._productionOverheadCostPerKgChartService.getChartData([]);
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    let monthText: string;
    monthText = ((startDate.getMonth() + 1) < 10 ? '0' + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + '';
    let startDateText = startDate.getFullYear() + '-' + monthText.slice(-2) + '-01';

    let endDate = new Date();
    let endDateText = endDate.getFullYear() + '-' + (endDate.getMonth() < 10 ? '0' + endDate.getMonth() : endDate.getMonth()) + '-' + (new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyProductionOverheadCostPerKg(startDateText, endDateText).subscribe((data) => {
      this.amChart.dataProvider = data.json();
      this.amChart.validateData();
      this.chartService.fillTable(this.amChart);
    });
  }

  initChart(chart: any) {
    this.amChart = chart;
  }
}
