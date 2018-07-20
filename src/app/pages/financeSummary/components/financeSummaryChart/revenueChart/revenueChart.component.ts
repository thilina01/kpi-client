import { Component, SimpleChanges, Input } from '@angular/core';

import { RevenueChartService } from './revenueChart.service';

import 'style-loader!./revenueChart.scss';
import { ChartService } from '../../../../chart/chart.service';

@Component({
  selector: 'revenue-chart',
  templateUrl: './revenueChart.html'
})
export class RevenueChart {

  @Input()
  selected : boolean;  
  firstSelect: boolean = true;
  
  ngOnChanges(changes: SimpleChanges) {
    if(this.selected && this.firstSelect){
      this.fillChart();
      this.firstSelect = false;
    }    
  }
  
  amChart: any;
  chartData: any;
  numberOfMonths: number = 12;

  constructor(private _revenueChartService: RevenueChartService, private chartService: ChartService) {
    this.chartData = this._revenueChartService.getChartData([]);
  }

  onOptionChange(value): void {
    this.fillChart();
  }

  fillChart() {
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - this.numberOfMonths);
    let monthText: string;
    monthText = ((startDate.getMonth() + 1) < 10 ? '0' + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + '';
    let startDateText = startDate.getFullYear() + '-' + monthText.slice(-2) + '-01';

    let endDate = new Date();
    let endDateText = endDate.getFullYear() + '-' + (endDate.getMonth() < 10 ? '0' + endDate.getMonth() : endDate.getMonth()) + '-' + (new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyRevenue(startDateText, endDateText).subscribe((data) => {
      this.amChart.dataProvider = data;
      this.amChart.validateData();
      this.chartService.fillTable(this.amChart);
    });
  }

  initChart(chart: any) {
    this.amChart = chart;
  }
}
