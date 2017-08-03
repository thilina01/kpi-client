import { Component } from '@angular/core';

import { ProductionOverheadCostPerKgChartService } from './productionOverheadCostPerKgChart.service';
import { ChartService } from '../../../services/chart.service';

import 'style-loader!./productionOverheadCostPerKgChart.scss';

@Component({
  selector: 'production-overhead-cost-per-kg-chart',
  templateUrl: './productionOverheadCostPerKgChart.html'
})
export class ProductionOverheadCostPerKgChart {

  amChart: any;
  chartData: any;

  constructor(private _productionOverheadCostPerKgChartService: ProductionOverheadCostPerKgChartService, private chartService: ChartService) {
    
    this.chartData = this._productionOverheadCostPerKgChartService.getChartData([]);
    var startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    var monthText :string; 
    monthText = ((startDate.getMonth() + 1) < 10 ? "0" + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + "";
    var startDateText = startDate.getFullYear()+"-"+monthText.slice(-2)+"-01";
    
    var endDate = new Date();
    var endDateText = endDate.getFullYear()+"-"+(endDate.getMonth()<10?"0"+endDate.getMonth():endDate.getMonth())+"-"+(new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyProductionOverheadCostPerKg(startDateText, endDateText).then((data) => {
      this.amChart.dataProvider = data;
      this.amChart.validateData();
    });
  }

  initChart(chart: any) {
    this.amChart = chart;
  }
}
