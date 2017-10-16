import { Component } from '@angular/core';

import { Mdt6MonthsChartService } from './mdt6MonthsChart.service';

import 'style-loader!./mdt6MonthsChart.scss';

@Component({
  selector: 'mdt-6Months-chart',
  templateUrl: './mdt6MonthsChart.html'
})
export class Mdt6MonthsChart {

  chartData: Object;

  constructor(private _mdt6MonthsChartService: Mdt6MonthsChartService) {
    this.chartData = this._mdt6MonthsChartService.getData();
  }

  initChart(chart: any) {
    let zoomChart = () => {
    };

    chart.addListener('rendered', zoomChart);
    zoomChart();

    if (chart.zoomChart) {
      chart.zoomChart();
    }
  }
}
