import { Component, Input } from '@angular/core';

import { EnergyCostMainChartService } from './energyCostMainChart.service';


import 'style-loader!./energyCostMainChart.scss';
import { ChartService } from "../../chart/chart.service";

@Component({
  selector: 'energy-cost-main-chart',
  templateUrl: './energyCostMainChart.html'
})
export class EnergyCostMainChart {

  @Input('dataSource')
  public dataSource: string;

  @Input('location')
  public location: string;

  chartData: Object;
  amChart: any;

  constructor(private _energyCostMainChartService: EnergyCostMainChartService, private chartService: ChartService) {    
  }

  ngOnInit(): void {
    this.chartData = this._energyCostMainChartService.getData();
    var startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    var monthText :string; 
    monthText = ((startDate.getMonth() + 1) < 10 ? "0" + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + "";
    var startDateText = startDate.getFullYear()+"-"+monthText.slice(-2)+"-01";
    var endDate = new Date();
    //endDate.setMonth(endDate.getMonth() - 6);
    var endDateText = endDate.getFullYear() + "-" + (endDate.getMonth() < 10 ? "0" + endDate.getMonth() : endDate.getMonth()) + "-" + (new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyEnergyConsumptionByLocation(startDateText, endDateText, this.location).subscribe((data) => {
      this.amChart.dataProvider = data.json();
      this.amChart.validateData();
    });
    //this.chartData = this._energyCostMainChartService.getData();
  }
  
  initChart(chart: any) {
    this.amChart = chart;
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
