import { Component } from '@angular/core';

import { CumulativeSalesPerKgChartService } from './cumulativeSalesPerKgChart.service';


import 'style-loader!./cumulativeSalesPerKgChart.scss';
import { ChartService } from "../../chart/chart.service";

@Component({
  selector: 'cumulative-sales-per-kg-chart',
  templateUrl: './cumulativeSalesPerKgChart.html'
})
export class CumulativeSalesPerKgChart {

  amChart: any;

  constructor(private _cumulativeSalesPerKgChartService: CumulativeSalesPerKgChartService, private chartService: ChartService) {
    
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    let monthText :string; 
    monthText = ((startDate.getMonth() + 1) < 10 ? "0" + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + "";
    let startDateText = startDate.getFullYear()+"-"+monthText.slice(-2)+"-01";
    
    let endDate = new Date();
    let endDateText = endDate.getFullYear()+"-"+(endDate.getMonth()<10?"0"+endDate.getMonth():endDate.getMonth())+"-"+(new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyCumulativeSalesPerKg(startDateText, endDateText).subscribe((data) => {
      let chartData = this._cumulativeSalesPerKgChartService.getChartData(data);
      this.amChart = AmCharts.makeChart("cumulativeSalesPerKgchartdiv",chartData);
    });
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
