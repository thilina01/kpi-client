import { Component } from '@angular/core';

import { ConsumableCostPerKgChartService } from './consumableCostPerKgChart.service';
import { ChartService } from '../../../services/chart.service';

import 'style-loader!./consumableCostPerKgChart.scss';

@Component({
  selector: 'consumable-cost-per-kg-chart',
  templateUrl: './consumableCostPerKgChart.html'
})
export class ConsumableCostPerKgChart {

  amChart: any;

  constructor(private _consumableCostPerKgChartService: ConsumableCostPerKgChartService, private chartService: ChartService) {
    
    var startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    var monthText :string; 
    monthText = ((startDate.getMonth()+1)<10?"0"+startDate.getMonth()+1:startDate.getMonth()+1)+"";
    var startDateText = startDate.getFullYear()+"-"+monthText.slice(-2)+"-01";
    
    var endDate = new Date();
    var endDateText = endDate.getFullYear()+"-"+(endDate.getMonth()<10?"0"+endDate.getMonth():endDate.getMonth())+"-"+(new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyConsumableCostPerKgChart(startDateText, endDateText).then((data) => {
      var chartData = this._consumableCostPerKgChartService.getChartData(data);
      this.amChart = AmCharts.makeChart("consumableCostPerKgChartchartdiv",chartData);
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
