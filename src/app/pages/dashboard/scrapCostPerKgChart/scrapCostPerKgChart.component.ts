import { Component } from '@angular/core';

import { ScrapCostPerKgChartService } from './scrapCostPerKgChart.service';
import { ChartService } from '../../../services/chart.service';

import 'style-loader!./scrapCostPerKgChart.scss';

@Component({
  selector: 'scrap-cost-per-kg-chart',
  templateUrl: './scrapCostPerKgChart.html'
})
export class ScrapCostPerKgChart {

  amChart: any;

  constructor(private _scrapCostPerKgChartService: ScrapCostPerKgChartService, private chartService: ChartService) {
    
    var startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    var monthText :string; 
    monthText = ((startDate.getMonth()+1)<10?"0"+startDate.getMonth()+1:startDate.getMonth()+1)+"";
    var startDateText = startDate.getFullYear()+"-"+monthText.slice(-2)+"-01";
    
    var endDate = new Date();
    var endDateText = endDate.getFullYear()+"-"+(endDate.getMonth()<10?"0"+endDate.getMonth():endDate.getMonth())+"-"+(new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyScrapCostPerKg(startDateText, endDateText).then((data) => {
      var chartData = this._scrapCostPerKgChartService.getChartData(data);
      this.amChart = AmCharts.makeChart("scrapCostPerKgchartdiv",chartData);
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
