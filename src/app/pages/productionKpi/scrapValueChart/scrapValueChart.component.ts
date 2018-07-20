import { Component, Input, SimpleChanges } from '@angular/core';

import { ScrapValueChartService } from './scrapValueChart.service';
import { BaThemeConfigProvider } from '../../../theme';

import 'style-loader!./scrapValueChart.scss';
import { ChartService } from "../../chart/chart.service";

@Component({
  selector: 'scrap-value-chart',
  templateUrl: './scrapValueChart.html'
})
export class ScrapValueChart {

  @Input()
  selected : boolean;  
  firstSelect: boolean = true;
  
  ngOnChanges(changes: SimpleChanges) {
    if(this.selected && this.firstSelect){
      this.fillChart();
      this.firstSelect = false;
    }    
  }
  
  layoutColors = this.baConfig.get().colors;
  graphColor = this.baConfig.get().colors.custom.productionKpiScrapValueChart;

  chartData = {
    "type": "serial",
    "theme": "blur",
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
      "balloonText": "[[category]]: <b>[[value]]</b>",
      "fillAlphas": 0.8,
      "lineAlpha": 0.2,
      "type": "column",
      "valueField": "value",
      "labelText": "[[value]]",
      "title": "Value"
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
    },
    "legend": {
      "position": "top",
      "valueWidth": 100,
      "valueAlign": "left"
    },
    'dataTableId': 'scrapValuechartdata',
    'autoMargins': false,
    'marginLeft': 100,
    'marginRight': 0,
    'marginBottom': 25
  };

  amChart: any;
  numberOfMonths: number = 12;

  constructor(private baConfig: BaThemeConfigProvider, private chartService: ChartService) {
  }

  onOptionChange(value): void {
    this.fillChart();
  }
  
  fillChart() {
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - this.numberOfMonths);
    let monthText: string;
    monthText = ((startDate.getMonth() + 1) < 10 ? "0" + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + "";
    let startDateText = startDate.getFullYear() + "-" + monthText.slice(-2) + "-01";

    let endDate = new Date();
    let endDateText = endDate.getFullYear() + "-" + (endDate.getMonth() < 10 ? "0" + endDate.getMonth() : endDate.getMonth()) + "-" + (new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyScrapValue(startDateText, endDateText).subscribe((data) => {
      this.amChart.dataProvider = data;
      this.amChart.validateData();
      this.chartService.fillTable(this.amChart);
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
