import { Component, Input } from '@angular/core';

import { KwhKvaMainChartService } from './kwhKvaMainChart.service';

import 'style-loader!./kwhKvaMainChart.scss';

@Component({
  selector: 'kwh-kva-main-chart',
  templateUrl: './kwhKvaMainChart.html'
})
export class KwhKvaMainChart {

  @Input('dataSource')
  public dataSource: string;

  chartData: Object;

  constructor(private _kwhKvaMainChartService: KwhKvaMainChartService) {
  }

  ngOnInit(): void {
    this.chartData = this._kwhKvaMainChartService.getData(this.dataSource);
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
