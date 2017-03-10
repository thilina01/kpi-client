import { Component, Input } from '@angular/core';

import { Line5ReworksBarChartService } from './line5ReworksBarChart.service';

import 'style-loader!./line5ReworksBarChart.scss';

@Component({
  selector: 'reworks-chart',
  templateUrl: './line5ReworksBarChart.html'
})
export class Line5ReworksBarChart {

  @Input('dataSource')
  public dataSource: string;

  @Input('chartType')
  public chartType: string = 'barChart';

  chartData: Object;

  constructor(private _line5ReworksBarChartService: Line5ReworksBarChartService) {
  }

  ngOnInit(): void {
    this.chartData = this._line5ReworksBarChartService.getData(this.dataSource, this.chartType);
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
