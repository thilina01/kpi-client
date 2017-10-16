import { Component } from '@angular/core';

import { MttrChartService } from './mttrChart.service';

import 'style-loader!./mttrChart.scss';

@Component({
  selector: 'mttr-chart',
  templateUrl: './mttrChart.html'
})
export class MttrChart {

  chartData: Object;

  constructor(private _mttrChartService: MttrChartService) {
    this.chartData = this._mttrChartService.getData();
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
