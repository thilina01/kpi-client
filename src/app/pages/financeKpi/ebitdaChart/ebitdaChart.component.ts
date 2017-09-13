import { Component } from '@angular/core';

import { EbitdaChartService } from './ebitdaChart.service';


import 'style-loader!./ebitdaChart.scss';
import { ChartService } from "../../chart/chart.service";

@Component({
  selector: 'ebitda-chart',
  templateUrl: './ebitdaChart.html'
})
export class EbitdaChart {

  amChart: any;
  chartData: any;

  constructor(private _ebitdaChartService: EbitdaChartService, private chartService: ChartService) {
    this.chartData = this._ebitdaChartService.getChartData([]);
    var startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    var monthText :string;
    monthText = ((startDate.getMonth() + 1) < 10 ? "0" + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + "";
    var startDateText = startDate.getFullYear()+"-"+monthText.slice(-2)+"-01";

    var endDate = new Date();
    var endDateText = endDate.getFullYear()+"-"+(endDate.getMonth()<10?"0"+endDate.getMonth():endDate.getMonth())+"-"+(new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyEbitda(startDateText, endDateText).subscribe((data) => {
      this.amChart.dataProvider = data.json();
      this.amChart.validateData();
    });
  }

  initChart(chart: any) {
    this.amChart = chart;
  }
}
