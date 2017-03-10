import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class MtbfMttr6MonthsChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardMtbfMttr6MonthsChart;

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
        { "month": " Aug(2016)  ", "mtbf": 190.78, "mttr": 1.59 },
        { "month": " Sep(2016)  ", "mtbf": 230.25, "mttr": 2.42 },
        { "month": " Oct(2016)  ", "mtbf": 575.49, "mttr": 2.58 },
        { "month": " Nov(2016)  ", "mtbf": 412.43, "mttr": 1.90 },
        { "month": " Dec(2016)  ", "mtbf": 465.85, "mttr": 0.98 },
        { "month": " Jan(2017)  ", "mtbf": 272.03, "mttr": 1.40 },

      ],
      "valueAxes": [{
        "id":"v1",
        "axisAlpha": 0,
        "position": "left"
      },{
        "id":"v2",
        "axisAlpha": 0,
        "position": "right"
      }],
      "startDuration": 1,
      "graphs": [{
        "valueAxis": "v1",
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
        "fillAlphas": 1,
        "title": "MTBF",
        "type": "column",
        "valueField": "mtbf",
        "labelText": "[[mtbf]]",
        "labelPosition": "left"
      }, {
        "valueAxis": "v2",
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
        "title": "MTTR",
        "valueField": "mttr",
        "dashLengthField": "dashLengthLine",
        "labelText": "[[mttr]]",
        //"labelRotation": -30,
        "labelPosition": "right"
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
