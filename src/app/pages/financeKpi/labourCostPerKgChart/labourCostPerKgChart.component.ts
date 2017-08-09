import { Component } from '@angular/core';

import { LabourCostPerKgChartService } from './labourCostPerKgChart.service';


import 'style-loader!./labourCostPerKgChart.scss';
import { ChartService } from "../../chart/chart.service";

@Component({
  selector: 'labour-cost-per-kg-chart',
  templateUrl: './labourCostPerKgChart.html'
})
export class LabourCostPerKgChart {

  amChart: any;
  chartData: any;
  constructor(private _labourCostPerKgChartService: LabourCostPerKgChartService, private chartService: ChartService) {
    
    
    this.chartData = this._labourCostPerKgChartService.getChartData([]);
    var startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    var monthText :string; 
    monthText = ((startDate.getMonth() + 1) < 10 ? "0" + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + "";
    var startDateText = startDate.getFullYear()+"-"+monthText.slice(-2)+"-01";
    
    var endDate = new Date();
    var endDateText = endDate.getFullYear()+"-"+(endDate.getMonth()<10?"0"+endDate.getMonth():endDate.getMonth())+"-"+(new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyLabourCostPerKg(startDateText, endDateText).then((data) => {
      this.amChart.dataProvider = data;
      this.amChart.validateData();
    });
  }

  initChart(chart: any) {
    this.amChart = chart;
  }
}
