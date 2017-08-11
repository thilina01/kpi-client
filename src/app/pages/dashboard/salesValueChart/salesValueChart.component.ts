import { Component } from '@angular/core';

import { SalesValueChartService } from './salesValueChart.service';


import 'style-loader!./salesValueChart.scss';
import { ChartService } from "../../chart/chart.service";



@Component({
  selector: 'sales-value-chart',
  templateUrl: './salesValueChart.html'
})
export class SalesValueChart {

  amChart: any;

  constructor(private _salesValueChartService: SalesValueChartService, private chartService: ChartService) {
    
    var startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    var monthText :string; 
    monthText = ((startDate.getMonth() + 1) < 10 ? "0" + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + "";
    var startDateText = startDate.getFullYear()+"-"+monthText.slice(-2)+"-01";
    
    var endDate = new Date();
    var endDateText = endDate.getFullYear()+"-"+(endDate.getMonth()<10?"0"+endDate.getMonth():endDate.getMonth())+"-"+(new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlySalesValue(startDateText, endDateText).subscribe((data) => {
      var chartData = this._salesValueChartService.getChartData(data);
      this.amChart = AmCharts.makeChart("salesValuechartdiv",chartData);
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
