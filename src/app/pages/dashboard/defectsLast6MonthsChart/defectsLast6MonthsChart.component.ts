import { Component, Input } from '@angular/core';

import { DefectsLast6MonthsChartService } from './defectsLast6MonthsChart.service';

import 'style-loader!./defectsLast6MonthsChart.scss';

@Component({
  selector: 'defects-last-6months-chart',
  templateUrl: './defectsLast6MonthsChart.html'
})
export class DefectsLast6MonthsChart {

  chartData: Object;

  constructor(private _defectsLast6MonthsChartService: DefectsLast6MonthsChartService) {
  }

  ngOnInit(): void {
    this.chartData = this._defectsLast6MonthsChartService.getData();
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
