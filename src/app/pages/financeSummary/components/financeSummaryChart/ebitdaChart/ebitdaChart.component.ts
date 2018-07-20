import { Component, Input, SimpleChanges } from '@angular/core';
import { EbitdaChartService } from './ebitdaChart.service';
import 'style-loader!./ebitdaChart.scss';
import { ChartService } from '../../../../chart/chart.service';

@Component({
  selector: 'ebitda-chart',
  templateUrl: './ebitdaChart.html'
})
export class EbitdaChart {

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

  constructor(private _ebitdaChartService: EbitdaChartService, private chartService: ChartService) {
    this.chartData = this._ebitdaChartService.getChartData([]);
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
    let endDateText = endDate.getFullYear() +
      '-' + (endDate.getMonth() < 10 ? '0' + endDate.getMonth() : endDate.getMonth()) +
      '-' + (new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyEbitda(startDateText, endDateText).subscribe((data) => {
      this.amChart.dataProvider = data;
      this.amChart.validateData();
      this.chartService.fillTable(this.amChart);
    });
  }

  initChart(chart: any) {
    this.amChart = chart;
  }
}
