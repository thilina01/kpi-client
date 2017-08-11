import { Component, Input } from '@angular/core';

import { KwhKvaMainChartService } from './kwhKvaMainChart.service';


import 'style-loader!./kwhKvaMainChart.scss';
import { ChartService } from "../../chart/chart.service";

@Component({
  selector: 'kwh-kva-main-chart',
  templateUrl: './kwhKvaMainChart.html'
})
export class KwhKvaMainChart {

  @Input('dataSource')
  public dataSource: string;

  @Input('location')
  public location: string;

  chartData: Object;
  amChart: any;

  constructor(private _kwhKvaMainChartService: KwhKvaMainChartService, private chartService: ChartService) {
  }

  ngOnInit(): void {
    this.chartData = this._kwhKvaMainChartService.getData();
    var startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    var monthText :string; 
    monthText = ((startDate.getMonth() + 1) < 10 ? "0" + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + "";
    var startDateText = startDate.getFullYear()+"-"+monthText.slice(-2)+"-01";
    
    var endDate = new Date();
    //endDate.setMonth(endDate.getMonth() - 6);
    var endDateText = endDate.getFullYear() + "-" + (endDate.getMonth() < 10 ? "0" + endDate.getMonth() : endDate.getMonth()) + "-" + (new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyEnergyConsumptionByLocation(startDateText, endDateText, this.location).subscribe((data) => {
      this.amChart.dataProvider = data;
      this.amChart.validateData();
    });
    //this.chartData = this._energyCostMainChartService.getData();
  }
  
  // ngOnInit(): void {
  //   this.chartData = this._kwhKvaMainChartService.getData(/*this.dataSource*/);
  // }
  
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
