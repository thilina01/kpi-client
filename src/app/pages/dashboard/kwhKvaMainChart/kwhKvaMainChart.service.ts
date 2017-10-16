import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class KwhKvaMainChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardKwhKvaMainChart;

    return {
      "type": "serial",
      "addClassNames": true,
      "theme": "blur",
      "depth3D": 20,
      "angle": 30,
      "balloon": {
        "adjustBorderColor": false,
        "horizontalPadding": 10,
        "verticalPadding": 8,
        "color": "#ffffff"
      },

      "dataProvider": [],
      "valueAxes": [{
        "id": "v1",
        "axisAlpha": 0,
        "position": "left"
      }, {
        "id": "v2",
        "axisAlpha": 0,
        "position": "right"
      }],
      "startDuration": 1,
      "graphs": [{
        "valueAxis": "v1",
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[kwh]]</span> [[additional]]</span>",
        "fillAlphas": 1,
        "title": "KWH",
        "type": "column",
        "valueField": "kwh",
        "labelText": "[[kwh]]",
        "labelPosition": "right"
      }, {
        "valueAxis": "v2",
        "id": "graph2",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[kva]]</span> [[additional]]</span>",
        "bullet": "round",
        "lineThickness": 3,
        "bulletSize": 7,
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "useLineColorForBulletBorder": true,
        "bulletBorderThickness": 3,
        "fillAlphas": 0,
        "lineAlpha": 1,
        "title": "KVA",
        "valueField": "kva",
        "dashLengthField": "dashLengthLine",
        "labelText": "[[kva]]",
        "labelPosition": "left"
      }],
      "categoryField": "month",
      "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "tickLength": 0
      },
      "export": {
        "enabled": true
      }
    };
  };
}
