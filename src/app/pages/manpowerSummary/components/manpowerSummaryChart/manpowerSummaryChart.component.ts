import { Component, Input, SimpleChanges } from '@angular/core';
import { BaThemeConfigProvider } from '../../../../theme';

import 'style-loader!./manpowerSummaryChart.scss';

@Component({
  selector: 'manpower-summary-chart',
  templateUrl: './manpowerSummaryChart.html'
})
export class ManpowerSummaryChart {
  @Input()
  data: any;
  // dataContext: any;

  layoutColors = this.baConfig.get().colors;
  graphColor = this.baConfig.get().colors.custom.productionKpiManpowerSummaryChart;
  ngOnChanges(changes: SimpleChanges) {
    if (this.amChart !== undefined) {
      this.amChart.dataProvider = this.data;
      this.amChart.validateData();

    }

  }

  chartData = {
    "type": "serial",
    "theme": "blur",
    "dataProvider": this.data,
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
      "balloonText": "[[category]]: <b>[[count]]</b>",
      "fillAlphas": 0.8,
      "lineAlpha": 0.2,
      "type": "column",
      "valueField": "count",
      "labelText": "[[count]]",
      "title": "Employee Count"
    }],
    "chartCursor": {
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    },
    "categoryField": "controlPointCode",
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
    // "listeners": [{
    //   "event": "clickGraphItem",
    //   "method": function(event) {
    //     console.log(event.item.dataContext);
    //   }
    // }],
    'dataTableId': 'manpowerSummarychartdata',
    'autoMargins': false,
    'marginLeft': 100,
    'marginRight': 0,
    'marginBottom': 25
  };

  amChart: any;
  constructor(private baConfig: BaThemeConfigProvider) {
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
