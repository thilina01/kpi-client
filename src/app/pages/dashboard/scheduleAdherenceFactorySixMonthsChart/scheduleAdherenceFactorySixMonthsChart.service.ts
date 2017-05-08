import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class ScheduleAdherenceFactorySixMonthsChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardScheduleAdherenceChart;

    return {
      "type": "serial",
      "theme": "blur",
      "depth3D": 20,
      "angle": 30,
      "dataProvider": [
        { "month": "Nov-16", "value": 90 },
        { "month": "Dec-16", "value": 95 },
        { "month": "Jan-17", "value": 94 },
        { "month": "Feb-17", "value": 88 },
        { "month": "Mar-17", "value": 93 },
        { "month": "Apr-17", "value": 88 }
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
        "balloonText": "[[category]]: <b>[[value]]%</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "value",
        "labelText": "[[value]]%"
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
      }
    };
  }
}
