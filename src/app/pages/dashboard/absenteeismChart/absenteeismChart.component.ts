import { Component } from '@angular/core';

import { AbsenteeismChartService } from './absenteeismChart.service';

import 'style-loader!./absenteeismChart.scss';

@Component({
  selector: 'absenteeism-chart',
  templateUrl: './absenteeismChart.html'
})
export class AbsenteeismChart {

  chartData: Object;

  constructor(private _absenteeismChartService: AbsenteeismChartService) {
    this.chartData = this._absenteeismChartService.getData();
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
