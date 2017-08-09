import { Component } from '@angular/core';

import { ProductionOverheadCostPerKgChartService } from './productionOverheadCostPerKgChart.service';


import 'style-loader!./productionOverheadCostPerKgChart.scss';
import { ChartService } from "../../chart/chart.service";



@Component({
  selector: 'production-overhead-cost-per-kg-chart',
  templateUrl: './productionOverheadCostPerKgChart.html'
})
export class ProductionOverheadCostPerKgChart {

  amChart: any;

  constructor(private _productionOverheadCostPerKgChartService: ProductionOverheadCostPerKgChartService, private chartService: ChartService) {
    
    var startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    var monthText :string; 
    monthText = ((startDate.getMonth() + 1) < 10 ? "0" + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + "";
    var startDateText = startDate.getFullYear()+"-"+monthText.slice(-2)+"-01";
    
    var endDate = new Date();
    var endDateText = endDate.getFullYear()+"-"+(endDate.getMonth()<10?"0"+endDate.getMonth():endDate.getMonth())+"-"+(new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyProductionOverheadCostPerKg(startDateText, endDateText).then((data) => {
      var chartData = this._productionOverheadCostPerKgChartService.getChartData(data);
      this.amChart = AmCharts.makeChart("productionOverheadCostPerKgchartdiv",chartData);
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
