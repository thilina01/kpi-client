import { Component } from '@angular/core';

import { MaterialCostPerKgChartService } from './materialCostPerKgChart.service';

import 'style-loader!./materialCostPerKgChart.scss';
import { ChartService } from '../../chart/chart.service';

@Component({
  selector: 'material-cost-per-kg-chart',
  templateUrl: './materialCostPerKgChart.html'
})
export class MaterialCostPerKgChart {

  amChart: any;
  chartData: any;
  numberOfMonths: number = 12;

  constructor(private _materialCostPerKgChartService: MaterialCostPerKgChartService, private chartService: ChartService) {
    this.chartData = this._materialCostPerKgChartService.getChartData([]);
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

    this.chartService.getMonthlyMaterialCostPerKg(startDateText, endDateText).subscribe((data) => {
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
