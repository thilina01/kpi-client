import { Component, Input, SimpleChanges } from '@angular/core';

import { SalesValueChartService } from './salesValueChart.service';

import 'style-loader!./salesValueChart.scss';
import { ChartService } from '../../chart/chart.service';

@Component({
  selector: 'sales-value-chart',
  templateUrl: './salesValueChart.html'
})
export class SalesValueChart {

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

  constructor(private _salesValueChartService: SalesValueChartService, private chartService: ChartService) {
    this.chartData = this._salesValueChartService.getChartData([]);
  }

  initChart(chart: any) {
    this.amChart = chart;
  }

  fillChart() {
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - this.numberOfMonths);
    let monthText: string;
    monthText = ((startDate.getMonth() + 1) < 10 ? '0' + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + '';
    let startDateText = startDate.getFullYear() + '-' + monthText.slice(-2) + '-01';

    let endDate = new Date();
    let endDateText = endDate.getFullYear() + '-' + (endDate.getMonth() < 10 ? '0' + endDate.getMonth() : endDate.getMonth()) + '-' + (new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlySalesValue(startDateText, endDateText).subscribe((data) => {
      this.amChart.dataProvider = data;
      this.amChart.validateData();
      this.chartService.fillTable(this.amChart);
    });
  }

  onOptionChange(value): void {
    this.fillChart();
  }
}
