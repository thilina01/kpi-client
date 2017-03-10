import { Component } from '@angular/core';

import { ScrapChartService } from './scrapChart.service';

import 'style-loader!./scrapChart.scss';

@Component({
  selector: 'scrap-chart',
  templateUrl: './scrapChart.html'
})
export class ScrapChart {

  chartData: Object;

  constructor(private _scrapChartService: ScrapChartService) {
    this.chartData = this._scrapChartService.getData();
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
