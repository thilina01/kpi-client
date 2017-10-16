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
    };

    chart.addListener('rendered', zoomChart);
    zoomChart();

    if (chart.zoomChart) {
      chart.zoomChart();
    }
  }
}
