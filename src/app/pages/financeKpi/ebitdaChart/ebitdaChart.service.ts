import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class EbitdaChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

 getChartData(data) {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.financeKpiEbitdaChart;

    return {
      "type": "serial",
      "theme": "blur",
      "depth3D": 20,
      "angle": 30,
      "dataProvider": data/*[
        { "month": "Nov-16", "value": 90 },
        { "month": "Dec-16", "value": 95 },
        { "month": "Jan-17", "value": 94 },
        { "month": "Feb-17", "value": 88 },
        { "month": "Mar-17", "value": 93 },
        { "month": "Apr-17", "value": 88 }
      ]*/,
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
        "balloonText": "[[title]]: <b>[[value]]</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "budget",
        "labelText": "[[value]]",
        "title": "Budget"
      }, {
        "title": "Actual",
        "balloonText": "[[title]]: <b>[[value]]</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "actual",
        "labelText": "[[value]]"
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
        "valueWidth":100,
        "valueAlign":"left"
      }
    };
  };
}
