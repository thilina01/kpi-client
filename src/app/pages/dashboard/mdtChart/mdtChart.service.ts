import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class MdtChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardMdtChart;

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
        { "section": "AWL", "value": 0.411, "target": 0.942 },
        { "section": "CWL", "value": 0.649, "target": 0.744 },
        { "section": "DWL", "value": 0.174, "target": 0.340 },
        { "section": "Gas Cutting", "value": 0.000, "target": 0.300 },
        { "section": "Machining", "value": 0.613, "target": 1.056 },
        { "section": "Painting", "value": 0.000, "target": 1.056 },
        { "section": "SBL", "value": 0.252, "target": 1.050 },
        { "section": "Shearing", "value": 2.303, "target": 0.732 },
        { "section": "Grand Total", "value": 0.515, "target": 1.100 }
      ],
      "valueAxes": [{
        "axisAlpha": 0,
        "position": "left"
      }],
      "startDuration": 1,
      "graphs": [{
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
        "fillAlphas": 1,
        "title": "Value",
        "type": "column",
        "valueField": "value",
        "labelText": "[[value]]%"
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
        "labelPosition": "top"
      }],
      "categoryField": "section",
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
