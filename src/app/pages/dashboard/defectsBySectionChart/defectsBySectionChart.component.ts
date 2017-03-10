import { Component, Input } from '@angular/core';

import { DefectsBySectionChartService } from './defectsBySectionChart.service';

import 'style-loader!./defectsBySectionChart.scss';

@Component({
  selector: 'defects-by-section-chart',
  templateUrl: './defectsBySectionChart.html'
})
export class DefectsBySectionChart {

  chartData: Object;

  constructor(private _defectsBySectionChartService: DefectsBySectionChartService) {
  }

  ngOnInit(): void {
    this.chartData = this._defectsBySectionChartService.getData();
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
