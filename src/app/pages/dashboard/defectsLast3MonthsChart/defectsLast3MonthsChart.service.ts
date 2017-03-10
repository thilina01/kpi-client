import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class DefectsLast3MonthsChartService {
  defectsLast3Months = [
    { "section": "CWL", "Nov-16": 7.99, "Dec-16": 4.84, "Jan-17": 6.94 },
    { "section": "Gas Cutting", "Nov-16": 0.00, "Dec-16": 0.00, "Jan-17": 0.00 },
    { "section": "DWL", "Nov-16": 2.40, "Dec-16": 3.50, "Jan-17": 2.90 },
    { "section": "Shearing", "Nov-16": 0.96, "Dec-16": 0.79, "Jan-17": 0.30 },
    { "section": "AWL", "Nov-16": 2.31, "Dec-16": 6.66, "Jan-17": 4.47 },
    { "section": "Painting", "Nov-16": 5.19, "Dec-16": 0.71, "Jan-17": 0.23 },
    { "section": "Machining", "Nov-16": 0.00, "Dec-16": 0.00, "Jan-17": 0.00 },
    { "section": "1500 Press", "Nov-16": 0.55, "Dec-16": 0.00, "Jan-17": 0.83 },
    { "section": "SBL", "Nov-16": 5.74, "Dec-16": 2.92, "Jan-17": 2.74 }
  ];

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardDefectsLast3MonthsChart;


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

      "dataProvider": this.defectsLast3Months,
      "valueAxes": [{
        "axisAlpha": 0,
        "position": "left"
      }],
      "startDuration": 1,
      "graphs": [{
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[Nov-16]]%</span> [[additional]]</span>",
        "fillAlphas": 1,
        "title": "Nov-16",
        "type": "column",
        "valueField": "Nov-16",
        "labelText": "[[Nov-16]]%",
        "labelPosition": "top"
      },{
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[Dec-16]]%</span> [[additional]]</span>",
        "fillAlphas": 1,
        "title": "Dec-16",
        "type": "column",
        "valueField": "Dec-16",
        "labelText": "[[Dec-16]]%",
        "labelPosition": "top"
      },{
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[Jan-17]]%</span> [[additional]]</span>",
        "fillAlphas": 1,
        "title": "Jan-17",
        "type": "column",
        "valueField": "Jan-17",
        "labelText": "[[Jan-17]]%",
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
