import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class Mdt6MonthsChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardMdt6MonthsChart;

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

      "dataProvider": [
        { "month": " Nov(2016)  ", "mdt": 0.46, "target": 1.1 },
        { "month": " Dec(2016)  ", "mdt": 0.21, "target": 1.1 },
        { "month": " Jan(2017)  ", "mdt": 0.515, "target": 1.1 },
        { "month": " Feb(2017)  ", "mdt": 0.71, "target": 1.1 },
        { "month": " Mar(2017)  ", "mdt": 1.04, "target": 1.1 },
        { "month": " Apr(2017)  ", "mdt": 0.61, "target": 1.1 },
        { "month": " May(2017)  ", "mdt": 2.18, "target": 1.1 },
        { "month": " June(2017)  ", "mdt": 1.74, "target": 1.1 }

      ],
      "valueAxes": [{
        "id":"v1",
        "axisAlpha": 0,
        "position": "left"
      }],
      "startDuration": 1,
      "graphs": [{
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
        "fillAlphas": 1,
        "title": "MDT",
        "type": "column",
        "valueField": "mdt",
        "labelText": "[[mdt]]%"
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
