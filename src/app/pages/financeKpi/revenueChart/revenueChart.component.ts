import { Component } from '@angular/core';

import { RevenueChartService } from './revenueChart.service';


import 'style-loader!./revenueChart.scss';
import { ChartService } from "../../chart/chart.service";

@Component({
  selector: 'revenue-chart',
  templateUrl: './revenueChart.html'
})
export class RevenueChart {

  amChart: any;
  chartData: any;

  constructor(private _revenueChartService: RevenueChartService, private chartService: ChartService) {
    this.chartData = this._revenueChartService.getChartData([]);
    var startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    var monthText :string;
    monthText = ((startDate.getMonth() + 1) < 10 ? "0" + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + "";
    var startDateText = startDate.getFullYear()+"-"+monthText.slice(-2)+"-01";

    var endDate = new Date();
    var endDateText = endDate.getFullYear()+"-"+(endDate.getMonth()<10?"0"+endDate.getMonth():endDate.getMonth())+"-"+(new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyRevenue(startDateText, endDateText).subscribe((data) => {
      this.amChart.dataProvider = data.json();
      this.amChart.validateData();
    });
  }

  initChart(chart: any) {
    this.amChart = chart;
  }
}
