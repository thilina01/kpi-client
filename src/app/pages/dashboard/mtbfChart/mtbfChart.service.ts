import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class MtbfChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardMtbfChart;

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
        { "section": " AWL ", "value": 212.71, "target": 214.87 },
        { "section": " CWL ", "value": 173.33, "target": 201.90 },
        { "section": " DWL ", "value": 287.54, "target": 78.31 },
        { "section": " Gas Cutting ", "value": 0, "target": 112.80 },
        { "section": " Machining ", "value": 333.27, "target": 191.43 },
        { "section": " Painting ", "value": 0, "target": 164.20 },
        { "section": " SBL ", "value": 215.29, "target": 164.20 },
        { "section": " Shearing ", "value": 217.08, "target": 166.80 },
        { "section": " Grand Total ", "value": 272.03, "target": 140.40 }
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
