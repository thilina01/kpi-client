import { Component } from '@angular/core';

import { Line5ReworksPieChartService } from './line5ReworksPieChart.service';

import 'style-loader!./line5ReworksPieChart.scss';

@Component({
  selector: 'line5-reworks-pie-chart',
  templateUrl: './line5ReworksPieChart.html'
})
export class Line5ReworksPieChart {

  chartData: Object;

  constructor(private _line5ReworksPieChartService: Line5ReworksPieChartService) {
    this.chartData = this._line5ReworksPieChartService.getData();
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
