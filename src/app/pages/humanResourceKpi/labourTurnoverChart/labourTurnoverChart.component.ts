import { Component, Input, SimpleChanges } from '@angular/core';

import { LabourTurnoverChartService } from './labourTurnoverChart.service';

import 'style-loader!./labourTurnoverChart.scss';
import { ChartService } from '../../chart/chart.service';

@Component({
  selector: 'labour-turnover-chart',
  templateUrl: './labourTurnoverChart.html'
})
export class LabourTurnoverChart {

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

  constructor(private _labourTurnoverChartService: LabourTurnoverChartService, private chartService: ChartService) {
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

    this.chartService.getMonthlyLabourTurnover(startDateText, endDateText).subscribe((data) => {
      this.chartData = this._labourTurnoverChartService.getChartData(data);
      this.amChart = AmCharts.makeChart('labourturnoverchartdiv', this.chartData);
    });
  }

  initChart(chart: any) {
    this.amChart = chart;
    let zoomChart = () => {
    };

    chart.addListener('rendered', zoomChart);
    zoomChart();

    if (chart.zoomChart) {
      chart.zoomChart();
    }
  }
}
