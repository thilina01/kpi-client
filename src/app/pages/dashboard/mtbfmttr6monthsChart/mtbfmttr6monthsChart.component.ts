import { Component } from '@angular/core';

import { MtbfMttr6MonthsChartService } from './mtbfmttr6monthsChart.service';

import 'style-loader!./mtbfmttr6monthsChart.scss';

@Component({
  selector: 'mtbf-mttr-6months-chart',
  templateUrl: './mtbfmttr6monthsChart.html'
})
export class MtbfMttr6MonthsChart {

  chartData: Object;

  constructor(private _mtbfmttr6monthsChartService: MtbfMttr6MonthsChartService) {
    this.chartData = this._mtbfmttr6monthsChartService.getData();
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
