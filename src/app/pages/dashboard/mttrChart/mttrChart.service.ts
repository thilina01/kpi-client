import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class MttrChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardMttrChart;

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
        { "section": "AWL", "value": 0.88, "target": 1.40 },
        { "section": "CWL", "value": 1.13, "target": 0.88 },
        { "section": "DWL", "value": 0.50, "target": 0.95 },
        { "section": "Gas Cutting", "value": 0, "target": 0.26 },
        { "section": "Machining", "value": 2.04, "target": 1.62 },
        { "section": "Painting", "value": 0, "target": 0.83 },
        { "section": "SBL", "value": 0.54, "target": 0.83 },
        { "section": "Shearing", "value": 5.00, "target": 0.84 },
        { "section": "Grand Total", "value": 1.40, "target": 1.30 }
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
        "labelText": "[[value]]"
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
        "labelText": "[[target]]",
        //"labelRotation": -30,
        //"labelPosition": "top"
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
