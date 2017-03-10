import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class DefectsBySectionChartService {
  defectsBySection = [
    { "section": "CWL", "defects": 6.941 },
    { "section": "AWL", "defects": 4.473 },
    { "section": "SBL", "defects": 2.744 },
    { "section": "DWL", "defects": 2.902 },
    { "section": "1500 Press", "defects": 0.828 },
    { "section": "Shearing", "defects": 0.305 },
    { "section": "Painting", "defects": 0.234 },
    { "section": "Gas Cutting", "defects": 0.000 },
    { "section": "Machining", "defects": 0.000 }
  ];

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardDefectsBySectionChart;


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

      "dataProvider": this.defectsBySection,
      "valueAxes": [{
        "id": "v1",
        "axisAlpha": 0,
        "position": "left"
      }],
      "startDuration": 1,
      "graphs": [{
        "valueAxis": "v1",
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[defects]]%</span> [[additional]]</span>",
        "fillAlphas": 1,
        "title": "Defects",
        "type": "column",
        "valueField": "defects",
        "labelText": "[[defects]]%",
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
