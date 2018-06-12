import { Component } from '@angular/core';

import { AbsenteeismChartService } from './absenteeismChart.service';

import 'style-loader!./absenteeismChart.scss';
import { ChartService } from '../../chart/chart.service';

@Component({
  selector: 'absenteeism-chart',
  templateUrl: './absenteeismChart.html'
})
export class AbsenteeismChart {

  amChart: any;

  constructor(private _absenteeismChartService: AbsenteeismChartService, private chartService: ChartService) {

    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    let monthText: string;
    monthText = ((startDate.getMonth() + 1) < 10 ? '0' + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + '';
    let startDateText = startDate.getFullYear() + '-' + monthText.slice(-2) + '-01';

    let endDate = new Date();
    let endDateText = endDate.getFullYear() + '-' + (endDate.getMonth() < 10 ? '0' + endDate.getMonth() : endDate.getMonth()) + '-' + (new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyAbsenteeism(startDateText, endDateText).subscribe((data) => {
      let chartData = this._absenteeismChartService.getChartData(data);
      this.amChart = AmCharts.makeChart('absenteeismchartdiv', chartData);
    });
  }

  initChart(chart: any) {
    // let zoomChart = () => {
    // };

    // chart.addListener('rendered', zoomChart);
    // zoomChart();

    // if (chart.zoomChart) {
    //   chart.zoomChart();
    // }
  }
}
