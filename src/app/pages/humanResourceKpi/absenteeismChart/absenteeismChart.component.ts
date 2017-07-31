import { Component } from '@angular/core';

import { AbsenteeismChartService } from './absenteeismChart.service';
import { ChartService } from '../../../services/chart.service';

import 'style-loader!./absenteeismChart.scss';

@Component({
  selector: 'absenteeism-chart',
  templateUrl: './absenteeismChart.html'
})
export class AbsenteeismChart {

  amChart: any;
  chartData: any;
  constructor(private _absenteeismChartService: AbsenteeismChartService, private chartService: ChartService) {
    
    this.chartData = this._absenteeismChartService.getChartData([]);
    var startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    var monthText :string; 
    monthText = ((startDate.getMonth()+1)<10?"0"+startDate.getMonth()+1:startDate.getMonth()+1)+"";
    var startDateText = startDate.getFullYear()+"-"+monthText.slice(-2)+"-01";
    
    var endDate = new Date();
    var endDateText = endDate.getFullYear()+"-"+(endDate.getMonth()<10?"0"+endDate.getMonth():endDate.getMonth())+"-"+(new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyAbsenteeism(startDateText, endDateText).then((data) => {
      this.amChart.dataProvider = data;
      this.amChart.validateData();
    });
  }

  initChart(chart: any) {
    this.amChart = chart;
  }
}
