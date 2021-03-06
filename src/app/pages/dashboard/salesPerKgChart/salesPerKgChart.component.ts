import { Component } from '@angular/core';

import { SalesPerKgChartService } from './salesPerKgChart.service';

import 'style-loader!./salesPerKgChart.scss';
import { ChartService } from "../../chart/chart.service";

@Component({
  selector: 'sales-per-kg-chart',
  templateUrl: './salesPerKgChart.html'
})
export class SalesPerKgChart {

  amChart: any;

  constructor(private _salesPerKgChartService: SalesPerKgChartService, private chartService: ChartService) {

    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    let monthText: string;
    monthText = ((startDate.getMonth() + 1) < 10 ? "0" + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + "";
    let startDateText = startDate.getFullYear() + "-" + monthText.slice(-2) + "-01";

    let endDate = new Date();
    let endDateText = endDate.getFullYear() + "-" + (endDate.getMonth() < 10 ? "0" + endDate.getMonth() : endDate.getMonth()) + "-" + (new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlySalesPerKg(startDateText, endDateText).subscribe((data) => {
      let chartData = this._salesPerKgChartService.getChartData(data);
      this.amChart = AmCharts.makeChart("salesPerKgchartdiv", chartData);
    });
  }

  initChart(chart: any) {
    let zoomChart = () => {
    };

    chart.addListener('rendered', zoomChart);
    zoomChart();

    if (chart.zoomChart) {
      chart.zoomChart();
    }
  }
}
