import { Component } from '@angular/core';

import { NetProfitChartService } from './netProfitChart.service';


import 'style-loader!./netProfitChart.scss';
import { ChartService } from "../../chart/chart.service";

@Component({
  selector: 'net-profit-chart',
  templateUrl: './netProfitChart.html'
})
export class NetProfitChart {

  amChart: any;
  chartData: any;

  constructor(private _netProfitChartService: NetProfitChartService, private chartService: ChartService) {
    this.chartData = this._netProfitChartService.getChartData([]);
    var startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    var monthText :string;
    monthText = ((startDate.getMonth() + 1) < 10 ? "0" + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + "";
    var startDateText = startDate.getFullYear()+"-"+monthText.slice(-2)+"-01";

    var endDate = new Date();
    var endDateText = endDate.getFullYear()+"-"+(endDate.getMonth()<10?"0"+endDate.getMonth():endDate.getMonth())+"-"+(new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyNetProfit(startDateText, endDateText).subscribe((data) => {
      this.amChart.dataProvider = data.json();
      this.amChart.validateData();
    });
  }

  initChart(chart: any) {
    this.amChart = chart;
  }
}
