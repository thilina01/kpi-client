import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class KwhKvaMainChartService {
  mainKvhKvaData = [
    { "month": " Aug-16", "kwh": 100170, "kva": 570 },
    { "month": " Sep-16", "kwh": 99646, "kva": 623 },
    { "month": " Oct-16", "kwh": 64028, "kva": 443.98 },
    { "month": " Nov-16", "kwh": 65955, "kva": 425 },
    { "month": " Dec-16", "kwh": 66850, "kva": 417.93 },
    { "month": " Jan-16", "kwh": 47004, "kva": 326.82 },
    { "month": " Feb-16", "kwh": 75605, "kva": 527 },
    { "month": " Mar-16", "kwh": 75823, "kva": 488 }
  ];

  paintKvhKvaData = [
    { "month": " Jul-16", "kwh": 26946, "kva": 204 },
    { "month": " Aug-16", "kwh": 20136, "kva": 209 },
    { "month": " Sep-16", "kwh": 12595, "kva": 187 },
    { "month": " Oct-16", "kwh": 12509, "kva": 187 },
    { "month": " Nov-16", "kwh": 17789, "kva": 173 },
    { "month": " Dec-16", "kwh": 11954, "kva": 187 },
    { "month": " Jan-16", "kwh": 7037, "kva": 173 },
    { "month": " Feb-16", "kwh": 21441, "kva": 188 },
    { "month": " Mar-16", "kwh": 20318, "kva": 184 }
  ];
  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData(dataSource: string) {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardKwhKvaMainChart;

    let dataProvider = [];
    if (dataSource === 'main') {
      dataProvider = this.mainKvhKvaData;
    } else if (dataSource === 'paint') {
      dataProvider = this.paintKvhKvaData;
    }
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

      "dataProvider": dataProvider,
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
        //"labelRotation": -30,
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
