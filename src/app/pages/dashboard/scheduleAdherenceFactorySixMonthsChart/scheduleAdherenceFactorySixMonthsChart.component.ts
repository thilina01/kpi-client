import { Component } from '@angular/core';

import { ScheduleAdherenceFactorySixMonthsChartService } from './scheduleAdherenceFactorySixMonthsChart.service';

import 'style-loader!./scheduleAdherenceFactorySixMonthsChart.scss';

@Component({
  selector: 'schedule-adherence-factory-six-months-chart',
  templateUrl: './scheduleAdherenceFactorySixMonthsChart.html'
})
export class ScheduleAdherenceFactorySixMonthsChart {

  chartData: Object;

  constructor(private scheduleAdherenceFactorySixMonthsChartService: ScheduleAdherenceFactorySixMonthsChartService) {
    this.chartData = this.scheduleAdherenceFactorySixMonthsChartService.getData();
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
