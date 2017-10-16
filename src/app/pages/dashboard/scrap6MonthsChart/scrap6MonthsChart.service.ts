import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class Scrap6MonthsChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardScrap6MonthsChart;

    return {
      "type": "serial",
      "theme": "blur",
      "depth3D": 20,
      "angle": 30,
      "dataProvider": [
        { "section": "Jul-16", "value": 215224 },
        { "section": "Aug-16", "value": 373827 },
        { "section": "Sep-16", "value": 264313 },
        { "section": "Oct-16", "value": 226380 },
        { "section": "Nov & Dec-16", "value": 425682 },
        { "section": "Jan17", "value": 262867 }
      ],
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
        "balloonText": "[[category]]: <b>[[value]]</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "value",
        "labelText": "[[value]]",
        "labelPosition": "bottom"
      }],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "categoryField": "section",
      "categoryAxis": {
        "gridPosition": "start",
        "gridAlpha": 0,
        "tickPosition": "start",
        "tickLength": 20,
        color: layoutColors.defaultText,
        axisColor: layoutColors.defaultText
      }
    };
  }
}