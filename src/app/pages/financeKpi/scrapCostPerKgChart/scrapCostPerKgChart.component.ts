import { Component } from '@angular/core';

import { ScrapCostPerKgChartService } from './scrapCostPerKgChart.service';


import 'style-loader!./scrapCostPerKgChart.scss';
import { ChartService } from "../../chart/chart.service";

@Component({
  selector: 'scrap-cost-per-kg-chart',
  templateUrl: './scrapCostPerKgChart.html'
})
export class ScrapCostPerKgChart {

  amChart: any;
  chartData: any;


  constructor(private _scrapCostPerKgChartService: ScrapCostPerKgChartService, private chartService: ChartService) {
    
    this.chartData = this._scrapCostPerKgChartService.getChartData([]);
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    let monthText :string; 
    monthText = ((startDate.getMonth() + 1) < 10 ? "0" + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + "";
    let startDateText = startDate.getFullYear()+"-"+monthText.slice(-2)+"-01";
    
    let endDate = new Date();
    let endDateText = endDate.getFullYear()+"-"+(endDate.getMonth()<10?"0"+endDate.getMonth():endDate.getMonth())+"-"+(new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyScrapCostPerKg(startDateText, endDateText).subscribe((data) => {
      this.amChart.dataProvider = data.json();
      this.amChart.validateData();
    });
  }

  initChart(chart: any) {
    this.amChart = chart;
  }
}

   