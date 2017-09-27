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
        { "month": " Feb(2017)  ", "mtbf": 199.18, "mttr": 1.40 },
        { "month": " Mar(2017)  ", "mtbf": 181.50, "mttr": 1.89 },
        { "month": " Apr(2017)  ", "mtbf": 253.02, "mttr": 1.54 },
        { "month": " May(2017)  ", "mtbf": 369.64, "mttr": 2.06 },
        { "month": " June(2017)  ", "mtbf": 79.27, "mttr": 1.38 },
        { "month": " July(2017)  ", "mtbf": 163.56, "mttr": 1.15 },
        { "month": " Aug(2017)  ", "mtbf": 124.62, "mttr": 0.91 }
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
