import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class LabourTurnoverChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardLabourTurnoverChart;

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

      "legend": {
        "horizontalGap": 10,
        "maxColumns": 1,
        "position": "right",
        "useGraphSettings": true,
        "markerSize": 10
      },
      "dataProvider": [
        { "month": " Mar(2017)  ", "TRW": 0, "Jayasinhe": 7.27, "target": 1 },
        { "month": " Apr(2017)  ", "TRW": 2.22, "Jayasinhe": 1.53, "target": 1 }

      ],
      "valueAxes": [{
        "id": "v1",
        "axisAlpha": 0,
        "position": "left"
      }],
      "startDuration": 1,
      "graphs": [{
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
        "fillAlphas": 1,
        "title": "TRW",
        "type": "column",
        "valueField": "TRW",
        "labelText": "[[TRW]]%"
      }, {
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
        "fillAlphas": 1,
        "title": "Jayasinhe",
        "type": "column",
        "valueField": "Jayasinhe",
        "labelText": "[[Jayasinhe]]%"
      }, {
        "id": "graph2",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
        "bullet": "round",
        "lineThickness": 3,
        "bulletSize": 7,
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "useLineColorForBulletBorder": true,
        "bulletBorderThickness": 3,
        "fillAlphas": 0,
        "lineAlpha": 1,
        "title": "Target",
        "valueField": "target",
        "dashLengthField": "dashLengthLine",
        "labelText": "[[target]]%",
        //"labelRotation": -30,
        "labelPosition": "top"
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
