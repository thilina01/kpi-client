import { Component } from '@angular/core';

import { MtbfChartService } from './mtbfChart.service';

import 'style-loader!./mtbfChart.scss';

@Component({
  selector: 'mtbf-chart',
  templateUrl: './mtbfChart.html'
})
export class MtbfChart {

  chartData: Object;

  constructor(private _mtbfChartService: MtbfChartService) {
    this.chartData = this._mtbfChartService.getData();
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
