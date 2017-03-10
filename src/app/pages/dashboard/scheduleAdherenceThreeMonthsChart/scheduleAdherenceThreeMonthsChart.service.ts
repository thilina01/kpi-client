import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class ScheduleAdherenceThreeMonthsChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardScheduleAdherenceThreeMonthsChart;

    return {
      "type": "serial",
      "theme": "blur",
      "dataProvider": [
        { "section": "CWL", "Nov-16": 86, "Dec-16": 95, "Jan-17": 90 },
        { "section": "Gas Cutting", "Nov-16": 100, "Dec-16": 100, "Jan-17": 98 },
        { "section": "DWL", "Nov-16": 92, "Dec-16": 92, "Jan-17": 93 },
        { "section": "Shearing", "Nov-16": 93, "Dec-16": 99, "Jan-17": 94 },
        { "section": "AWL", "Nov-16": 84, "Dec-16": 93, "Jan-17": 93 },
        { "section": "Painting", "Nov-16": 97, "Dec-16": 99, "Jan-17": 87 },
        { "section": "Machining", "Nov-16": 93, "Dec-16": 95, "Jan-17": 96 },
        { "section": "SBL", "Nov-16": 93, "Dec-16": 92, "Jan-17": 99 }
      ],
      creditsPosition: 'top-right',
      "valueAxes": [{
        minVerticalGap: 50,
        gridAlpha: 0,
        color: layoutColors.defaultText,
        axisColor: layoutColors.defaultText
      }],
      "depth3D": 20,
      "angle": 30,
      "gridAboveGraphs": true,
      "startDuration": 1,
      "graphs": [{
        "balloonText": "Nov-16: <b>[[Nov-16]]%</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "Nov-16",
        "labelText": "[[Nov-16]]%",
        "fillColors": "#00abff"
      }, {
        "balloonText": "Dec-16: <b>[[Dec-16]]%</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "Dec-16",
        "labelText": "[[Dec-16]]%",
        "fillColors": "#0D52D1"
      }, {
        "balloonText": "Jan-17: <b>[[Jan-17]]%</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "Jan-17",
        "labelText": "[[Jan-17]]%",
        "fillColors": "#2A0CD0"
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
