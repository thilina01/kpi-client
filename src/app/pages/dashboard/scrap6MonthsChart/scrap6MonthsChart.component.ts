import { Component } from '@angular/core';

import { Scrap6MonthsChartService } from './scrap6MonthsChart.service';

import 'style-loader!./scrap6MonthsChart.scss';

@Component({
  selector: 'scrap-6Months-chart',
  templateUrl: './scrap6MonthsChart.html'
})
export class Scrap6MonthsChart {

  chartData: Object;

  constructor(private _scrap6MonthsChartService: Scrap6MonthsChartService) {
    this.chartData = this._scrap6MonthsChartService.getData();
  }

  initChart(chart: any) {
    let zoomChart = () => {
      //chart.zoomToDates(new Date(2013, 3), new Date(2014, 0));
    };

    chart.addListener('rendered', zoomChart);
    zoomChart();

    if (chart.zoomChart) {
      chart.zoomChart();
    }
  }
}
