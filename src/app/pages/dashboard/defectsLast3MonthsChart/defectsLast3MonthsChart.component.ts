import { Component, Input } from '@angular/core';

import { DefectsLast3MonthsChartService } from './defectsLast3MonthsChart.service';

import 'style-loader!./defectsLast3MonthsChart.scss';

@Component({
  selector: 'defects-last-3months-chart',
  templateUrl: './defectsLast3MonthsChart.html'
})
export class DefectsLast3MonthsChart {

  chartData: Object;

  constructor(private _defectsLast3MonthsChartService: DefectsLast3MonthsChartService) {
  }

  ngOnInit(): void {
    this.chartData = this._defectsLast3MonthsChartService.getData();
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
