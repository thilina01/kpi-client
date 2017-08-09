import { Component } from '@angular/core';

import { ConsumableCostPerKgChartService } from './consumableCostPerKgChart.service';


import 'style-loader!./consumableCostPerKgChart.scss';
import { ChartService } from "../../chart/chart.service";

@Component({
  selector: 'consumable-cost-per-kg-chart',
  templateUrl: './consumableCostPerKgChart.html'
})
export class ConsumableCostPerKgChart {

  amChart: any;
  chartData: any;

  constructor(private _consumableCostPerKgChartService: ConsumableCostPerKgChartService, private chartService: ChartService) {
    
    this.chartData = this._consumableCostPerKgChartService.getChartData([]);
    var startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    var monthText :string; 
    monthText = ((startDate.getMonth() + 1) < 10 ? "0" + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + "";
    var startDateText = startDate.getFullYear()+"-"+monthText.slice(-2)+"-01";
    
    var endDate = new Date();
    var endDateText = endDate.getFullYear()+"-"+(endDate.getMonth()<10?"0"+endDate.getMonth():endDate.getMonth())+"-"+(new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyConsumableCostPerKgChart(startDateText, endDateText).then((data) => {
      this.amChart.dataProvider = data;
      this.amChart.validateData();
    });
  }

  initChart(chart: any) {
    this.amChart = chart;
  }
}
