import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class Line5ReworksPieChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardLine5ReworksPieChart;

    return {
      "type": "pie",
      "theme": "blur",
      "balloon": {
        "adjustBorderColor": false,
        "horizontalPadding": 10,
        "verticalPadding": 8,
        "color": "#ffffff"
      },
      "dataProvider": [
        { "type": " Welding Repaire  ", "value": 208 },
        { "type": "  Rim Tool Mark  ", "value": 63 },
        { "type": "  Over Lap   ", "value": 15 },
        { "type": "  Open Crack   ", "value": 5 },
        { "type": "  Band Repaire   ", "value": 3 },
        { "type": "  Welding Crack  ", "value": 3 }
      ],
      "valueField": "value",
      //"titleField": "type",
      "startDuration": 1,
     "balloonText": "<span style='font-size:12px;'>[[type]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
      "depth3D": 5,
      "angle": 5,
      "export": {
        "enabled": true
      }
    };
  };
}
