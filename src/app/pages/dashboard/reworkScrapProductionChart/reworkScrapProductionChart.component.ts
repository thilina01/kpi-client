import { Component, Input } from '@angular/core';

import { ReworkScrapProductionChartService } from './reworkScrapProductionChart.service';

import 'style-loader!./reworkScrapProductionChart.scss';

@Component({
  selector: 'rework-scrap-production-chart',
  templateUrl: './reworkScrapProductionChart.html'
})
export class ReworkScrapProductionChart {

  chartData: Object;

  constructor(private _reworkScrapProductionChartService: ReworkScrapProductionChartService) {
  }

  ngOnInit(): void {
    this.chartData = this._reworkScrapProductionChartService.getData();
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
