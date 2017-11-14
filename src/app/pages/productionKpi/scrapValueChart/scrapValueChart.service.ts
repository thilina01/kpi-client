import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';
import { ChartService } from "../../chart/chart.service";

@Injectable()
export class ScrapValueChartService {

  constructor(private _baConfig: BaThemeConfigProvider, private chartService: ChartService) {
  }

  dataProvider = [];
  getData() {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.productionKpiScrapValueChart;
    this.chartService.getMonthlyScrapValue('2017-01-01', '2017-05-31').subscribe((data) => {
      this.dataProvider = data;
    });
    return {
      "type": "serial",
      "theme": "blur",
      "dataProvider": this.dataProvider,
      creditsPosition: 'top-right',
      "valueAxes": [{
        minVerticalGap: 50,
        gridAlpha: 0,
        color: layoutColors.defaultText,
        axisColor: layoutColors.defaultText
      }],
      "gridAboveGraphs": true,
      "startDuration": 1,
      "graphs": [{
        "balloonText": "[[category]]: <b>[[scrap]]%</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "scrap",
        "labelText": "[[scrap]]%",
        "title": "Scrap"
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
        color: layoutColors.defaultText,
        axisColor: layoutColors.defaultText
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
  }
}
