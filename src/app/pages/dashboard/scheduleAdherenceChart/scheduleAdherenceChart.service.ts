import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class ScheduleAdherenceChartService {

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
        { "section": "AWL", "value": 90.003 },
        { "section": "CWL", "value": 98.354 },
        { "section": "DWL", "value": 92.611 },
        { "section": "Gas Cutting", "value": 94.324 },
        { "section": "Machining", "value": 92.882 },
        { "section": "Painting", "value": 87 },
        { "section": "SBL", "value": 96.443 },
        { "section": "Shearing", "value": 98.633 }
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