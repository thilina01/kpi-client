import { Component } from '@angular/core';

import { ConsumableCostPerKgChartService } from './consumableCostPerKgChart.service';

import 'style-loader!./consumableCostPerKgChart.scss';
import { ChartService } from '../../chart/chart.service';

@Component({
  selector: 'consumable-cost-per-kg-chart',
  templateUrl: './consumableCostPerKgChart.html'
})
export class ConsumableCostPerKgChart {

  amChart: any;
  chartData: any;
  numberOfMonths: number = 12;

  constructor(private _consumableCostPerKgChartService: ConsumableCostPerKgChartService, private chartService: ChartService) {
    this.chartData = this._consumableCostPerKgChartService.getChartData([]);
    this.fillChart();
  }

  fillChart() {
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - this.numberOfMonths);
    let monthText: string;
    monthText = ((startDate.getMonth() + 1) < 10 ? '0' + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + '';
    let startDateText = startDate.getFullYear() + '-' + monthText.slice(-2) + '-01';

    let endDate = new Date();
    let endDateText = endDate.getFullYear() + '-' + (endDate.getMonth() < 10 ? '0' + endDate.getMonth() : endDate.getMonth()) + '-' + (new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyConsumableCostPerKgChart(startDateText, endDateText).subscribe((data) => {
      this.amChart.dataProvider = data;
      this.amChart.validateData();
      this.chartService.fillTable(this.amChart);
    });
  }

  initChart(chart: any) {
    this.amChart = chart;
  }

  onOptionChange(value): void {
    this.fillChart();
  }
}
