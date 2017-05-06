import { Component } from '@angular/core';

import { LabourTurnoverChartService } from './labourTurnoverChart.service';

import 'style-loader!./labourTurnoverChart.scss';

@Component({
  selector: 'labour-turnover-chart',
  templateUrl: './labourTurnoverChart.html'
})
export class LabourTurnoverChart {

  chartData: Object;

  constructor(private _labourTurnoverChartService: LabourTurnoverChartService) {
    this.chartData = this._labourTurnoverChartService.getData();
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
