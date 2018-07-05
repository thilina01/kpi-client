import { Component } from '@angular/core';

import { MtbfMttr6MonthsChartService } from './mtbfmttr6monthsChart.service';

import 'style-loader!./mtbfmttr6monthsChart.scss';
import { ChartService } from '../../chart/chart.service';

@Component({
  selector: 'mtbf-mttr-6months-chart',
  templateUrl: './mtbfmttr6monthsChart.html'
})
export class MtbfMttr6MonthsChart {

  chartData: Object;
  amChart: any;

  constructor(private _mtbfmttr6monthsChartService: MtbfMttr6MonthsChartService, private chartService: ChartService) {
    this.chartData = this._mtbfmttr6monthsChartService.getData();
    this.chartService.getBreakdownSixMonths().subscribe((data) => {
      this.amChart.dataProvider = data;
      this.amChart.validateData();
    });
  }
  
  initChart(chart: any) {
    this.amChart = chart;
    let zoomChart = () => {
    };

    chart.addListener('rendered', zoomChart);
    zoomChart();

    if (chart.zoomChart) {
      chart.zoomChart();
    }
  }
}
