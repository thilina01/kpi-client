import { Component } from '@angular/core';

import { MaterialCostPerKgChartService } from './materialCostPerKgChart.service';


import 'style-loader!./materialCostPerKgChart.scss';
import { ChartService } from "../../chart/chart.service";



@Component({
  selector: 'material-cost-per-kg-chart',
  templateUrl: './materialCostPerKgChart.html'
})
export class MaterialCostPerKgChart {

  amChart: any;

  constructor(private _materialCostPerKgChartService: MaterialCostPerKgChartService, private chartService: ChartService) {
    
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    let monthText :string; 
    monthText = ((startDate.getMonth() + 1) < 10 ? "0" + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + "";
    let startDateText = startDate.getFullYear()+"-"+monthText.slice(-2)+"-01";
    
    let endDate = new Date();
    let endDateText = endDate.getFullYear()+"-"+(endDate.getMonth()<10?"0"+endDate.getMonth():endDate.getMonth())+"-"+(new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyMaterialCostPerKg(startDateText, endDateText).subscribe((data) => {
      let chartData = this._materialCostPerKgChartService.getChartData(data);
      this.amChart = AmCharts.makeChart("materialCostPerKgchartdiv",chartData);
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
