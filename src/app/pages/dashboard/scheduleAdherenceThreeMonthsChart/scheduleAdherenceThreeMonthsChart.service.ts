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
        { "section": "CWL", "Feb-17": 91, "Mar-17": 98, "APR-17": 88 },
        { "section": "BCL", "Feb-17": 97, "Mar-17": 100, "APR-17": 89 },
        { "section": "DWL", "Feb-17": 81, "Mar-17": 86, "APR-17": 77 },
        { "section": "PCL", "Feb-17": 92, "Mar-17": 91, "APR-17": 88 },
        { "section": "AWL", "Feb-17": 95, "Mar-17": 95, "APR-17": 96 },
        { "section": "PAL", "Feb-17": 75, "Mar-17": 100, "APR-17": 0 },
        { "section": "MAS", "Feb-17": 87, "Mar-17": 83, "APR-17": 87 },
        { "section": "SBL", "Feb-17": 89, "Mar-17": 93, "APR-17": 89 }
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
        "balloonText": "Feb-17: <b>[[Feb-17]]%</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "Feb-17",
        "labelText": "[[Feb-17]]%",
        "fillColors": "#00abff"
      }, {
        "balloonText": "Mar-17: <b>[[Mar-17]]%</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "Mar-17",
        "labelText": "[[Mar-17]]%",
        "fillColors": "#0D52D1"
      }, {
        "balloonText": "APR-17: <b>[[APR-17]]%</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "APR-17",
        "labelText": "[[APR-17]]%",
        "fillColors": "#0DCCD1"
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
