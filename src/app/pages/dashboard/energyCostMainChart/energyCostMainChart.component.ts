import { Component, Input } from '@angular/core';

import { EnergyCostMainChartService } from './energyCostMainChart.service';

import 'style-loader!./energyCostMainChart.scss';

@Component({
  selector: 'energy-cost-main-chart',
  templateUrl: './energyCostMainChart.html'
})
export class EnergyCostMainChart {

  @Input('dataSource')
  public dataSource: string;

  chartData: Object;

  constructor(private _energyCostMainChartService: EnergyCostMainChartService) {
  }

  ngOnInit(): void {
    this.chartData = this._energyCostMainChartService.getData(this.dataSource);
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
