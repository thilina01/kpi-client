import { Component } from '@angular/core';

import { MdtChartService } from './mdtChart.service';

import 'style-loader!./mdtChart.scss';

@Component({
  selector: 'mdt-chart',
  templateUrl: './mdtChart.html'
})
export class MdtChart {

  chartData: Object;

  constructor(private _mdtChartService: MdtChartService) {
    this.chartData = this._mdtChartService.getData();
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
