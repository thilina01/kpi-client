import { Component } from '@angular/core';

import { Mdt6MonthsChartService } from './mdt6MonthsChart.service';

import 'style-loader!./mdt6MonthsChart.scss';
import { ChartService } from '../../chart/chart.service';

@Component({
  selector: 'mdt-6Months-chart',
  templateUrl: './mdt6MonthsChart.html'
})
export class Mdt6MonthsChart {

  chartData: Object;
  amChart: any;

  constructor(private _mdt6MonthsChartService: Mdt6MonthsChartService, private chartService: ChartService) {
    this.chartData = this._mdt6MonthsChartService.getData();
    this.chartService.getBreakdownSixMonths().subscribe((data) => {
      this.amChart.dataProvider = data;
      this.amChart.validateData();
    });
  }

  initChart(chart: any) {
    this.amChart = chart;
    let zoomChart = () => {
    };

    chart.addListener('rendered', zoomChart);
    zoomChart();

    if (chart.zoomChart) {
      chart.zoomChart();
    }
  }
}
