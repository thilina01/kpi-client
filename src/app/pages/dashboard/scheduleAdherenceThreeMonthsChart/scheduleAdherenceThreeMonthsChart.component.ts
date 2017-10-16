import { Component } from '@angular/core';

import { ScheduleAdherenceThreeMonthsChartService } from './scheduleAdherenceThreeMonthsChart.service';

import 'style-loader!./scheduleAdherenceThreeMonthsChart.scss';

@Component({
  selector: 'schedule-adherence-three-months-chart',
  templateUrl: './scheduleAdherenceThreeMonthsChart.html'
})
export class ScheduleAdherenceThreeMonthsChart {

  chartData: Object;

  constructor(private _scheduleAdherenceThreeMonthsChartService: ScheduleAdherenceThreeMonthsChartService) {
    this.chartData = this._scheduleAdherenceThreeMonthsChartService.getData();
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
