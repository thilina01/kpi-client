import { Component } from '@angular/core';

import { SalesWeightChartService } from './salesWeightChart.service';

import 'style-loader!./salesWeightChart.scss';
import { ChartService } from '../../chart/chart.service';

@Component({
  selector: 'sales-weight-chart',
  templateUrl: './salesWeightChart.html'
})
export class SalesWeightChart {

  amChart: any;
  chartData: any;

  constructor(private _salesWeightChartService: SalesWeightChartService, private chartService: ChartService) {
    this.chartData = this._salesWeightChartService.getChartData([]);
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    let monthText: string;
    monthText = ((startDate.getMonth() + 1) < 10 ? '0' + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + '';
    let startDateText = startDate.getFullYear() + '-' + monthText.slice(-2) + '-01';

    let endDate = new Date();
    let endDateText = endDate.getFullYear() + '-' + (endDate.getMonth() < 10 ? '0' + endDate.getMonth() : endDate.getMonth()) + '-' + (new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlySalesWeight(startDateText, endDateText).subscribe((data) => {
      this.amChart.dataProvider = data.json();
      this.amChart.validateData();
      this.chartService.fillTable(this.amChart);
    });
  }

  initChart(chart: any) {
    this.amChart = chart;
  }
}
