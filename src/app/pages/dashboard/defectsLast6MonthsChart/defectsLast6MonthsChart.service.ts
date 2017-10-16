import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class DefectsLast6MonthsChartService {
  defectsLast6Months = [
    { "month": "Aug-16", "percentage": 2.24 },
    { "month": "Sep-16", "percentage": 1.89 },
    { "month": "Oct-16", "percentage": 1.30 },
    { "month": "Nov-16", "percentage": 2.77 },
    { "month": "Dec-16", "percentage": 3.03 },
    { "month": "Jan-17", "percentage": 2.41 }
  ];

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardDefectsLast6MonthsChart;

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

      "dataProvider": this.defectsLast6Months,
      "valueAxes": [{
        "axisAlpha": 0,
        "position": "left"
      }],
      "startDuration": 1,
      "graphs": [{
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[percentage]]%</span> [[additional]]</span>",
        "fillAlphas": 1,
        "title": "Defects",
        "type": "column",
        "valueField": "percentage",
        "labelText": "[[percentage]]%",
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
