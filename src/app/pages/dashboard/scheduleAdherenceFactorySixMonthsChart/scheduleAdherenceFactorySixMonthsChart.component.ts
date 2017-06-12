import { Component } from '@angular/core';

import { ScheduleAdherenceFactorySixMonthsChartService } from './scheduleAdherenceFactorySixMonthsChart.service';
import { BaThemeConfigProvider } from '../../../theme';
import { ChartService } from '../../../services/chart.service';

import 'style-loader!./scheduleAdherenceFactorySixMonthsChart.scss';

@Component({
  selector: 'schedule-adherence-factory-six-months-chart',
  templateUrl: './scheduleAdherenceFactorySixMonthsChart.html'
})
export class ScheduleAdherenceFactorySixMonthsChart {

  layoutColors = this.baConfig.get().colors;
  graphColor = this.baConfig.get().colors.custom.dashboardScheduleAdherenceChart;

  chartData = {
    "type": "serial",
    "theme": "blur",
    "depth3D": 20,
    "angle": 30,
    "dataProvider": [],
    creditsPosition: 'top-right',
    "valueAxes": [{
      minVerticalGap: 50,
      gridAlpha: 0,
      color: this.layoutColors.defaultText,
      axisColor: this.layoutColors.defaultText
    }],
    "gridAboveGraphs": true,
    "startDuration": 1,
    "graphs": [{
      "balloonText": "[[category]]: <b>[[adherence]]%</b>",
      "fillAlphas": 0.8,
      "lineAlpha": 0.2,
      "type": "column",
      "valueField": "adherence",
      "labelText": "[[adherence]]%"
    }],
    "chartCursor": {
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    },
    "categoryField": "month",
    "categoryAxis": {
      "gridPosition": "start",
      "gridAlpha": 0,
      "tickPosition": "start",
      "tickLength": 20,
      color: this.layoutColors.defaultText,
      axisColor: this.layoutColors.defaultText
    }
  };

  amChart: any;
  constructor(private baConfig: BaThemeConfigProvider, private chartService: ChartService) {
    var startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    var startDateText = startDate.getFullYear()+"-"+((startDate.getMonth()+1)<10?"0"+startDate.getMonth()+1:startDate.getMonth()+1)+"-01";
    
    var endDate = new Date();
    //endDate.setMonth(endDate.getMonth() - 6);
    var endDateText = endDate.getFullYear()+"-"+(endDate.getMonth()<10?"0"+endDate.getMonth():endDate.getMonth())+"-"+(new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyScheduleAdherence(startDateText, endDateText).then((data) => {
      this.amChart.dataProvider = data;
      this.amChart.validateData();
    });
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
