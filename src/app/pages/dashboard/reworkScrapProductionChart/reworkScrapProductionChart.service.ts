import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class ReworkScrapProductionChartService {
  reworkScrapProduction = [
    { "section": "CWL", "rework": 336, "scrap": 39, "production": 1073 },
    { "section": "AWL", "rework": 393, "scrap": 1, "production": 2759 },
    { "section": "SBL", "rework": 47, "scrap": 0, "production": 3254 },
    { "section": "DWL", "rework": 126, "scrap": 15, "production": 2799 },
    { "section": "1500 Press", "rework": 18, "scrap": 18, "production": 1330 },
    { "section": "Shearing", "rework": 22, "scrap": 0, "production": 7215 },
    { "section": "Painting", "rework": 4, "scrap": 73, "production": 1713 }
  ];

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardReworkScrapProductionChart;


    return {
      "type": "serial",
      "addClassNames": true,
      "theme": "blur",
      "depth3D": 10,
      "angle": 10,
      "balloon": {
        "adjustBorderColor": false,
        "horizontalPadding": 10,
        "verticalPadding": 8,
        "color": "#ffffff"
      },

      "dataProvider": this.reworkScrapProduction,
      "valueAxes": [{
        "id": "v1",
        "axisAlpha": 0,
        "position": "left"
      }],
      "startDuration": 1,
      "graphs": [{
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[rework]]</span> [[additional]]</span>",
        "fillAlphas": 1,
        "title": "Rework",
        "type": "column",
        "valueField": "rework",
        "labelText": "[[rework]]",
        "labelPosition": "top"
      }, {
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[scrap]]</span> [[additional]]</span>",
        "fillAlphas": 1,
        "title": "Scrap",
        "type": "column",
        "valueField": "scrap",
        "labelText": "[[scrap]]",
        "labelPosition": "top"
      }, {
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[production]]</span> [[additional]]</span>",
        "fillAlphas": 1,
        "title": "Production",
        "type": "column",
        "valueField": "production",
        "labelText": "[[production]]",
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
