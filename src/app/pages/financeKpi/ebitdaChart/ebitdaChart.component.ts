import { Component } from '@angular/core';
import { ChartService } from '../../chart/chart.service';
import { EbitdaChartService } from './ebitdaChart.service';
import 'style-loader!./ebitdaChart.scss';

@Component({
  selector: 'ebitda-chart',
  templateUrl: './ebitdaChart.html'
})
export class EbitdaChart {

  amChart: any;
  chartData: any;

  constructor(private _ebitdaChartService: EbitdaChartService, private chartService: ChartService) {
    this.chartData = this._ebitdaChartService.getChartData([]);
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    let monthText: string;
    monthText = ((startDate.getMonth() + 1) < 10 ? '0' + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + '';
    let startDateText = startDate.getFullYear() + '-' + monthText.slice(-2) + '-01';

    let endDate = new Date();
    let endDateText = endDate.getFullYear() +
      '-' + (endDate.getMonth() < 10 ? '0' + endDate.getMonth() : endDate.getMonth()) +
      '-' + (new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyEbitda(startDateText, endDateText).subscribe((data) => {
      this.amChart.dataProvider = data.json();
      this.amChart.validateData();
      this.chartService.fillTable(this.amChart);
    });
  }

  initChart(chart: any) {
    this.amChart = chart;
  }
}
