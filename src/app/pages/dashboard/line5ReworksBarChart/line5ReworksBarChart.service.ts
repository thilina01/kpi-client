import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class Line5ReworksBarChartService {

  awlReworksData = [{ "type": "Tool Mark", "value": 177 },
  { "type": "Blow Hole", "value": 50 },
  { "type": "Flatnes Out", "value": 40 },
  { "type": "Welding Repaire", "value": 37 },
  { "type": "OD<", "value": 20 },
  { "type": "Band Over Grinding", "value": 20 },
  { "type": "No Debur", "value": 11 },
  { "type": "CB >", "value": 11 },
  { "type": "Wrong Drawing Issued", "value": 6 },
  { "type": "Flange Crack", "value": 6 },
  { "type": "Rim Repaire", "value": 5 },
  { "type": "CB <", "value": 4 },
  { "type": "Nave Repaire", "value": 2 },
  { "type": "Height <", "value": 2 },
  { "type": "L4 Damage", "value": 1 }];

  cwlReworksData = [{ "type": "Welding Repaire", "value": 208 },
  { "type": "Rim Tool Mark", "value": 63 },
  { "type": "Over Lap", "value": 15 },
  { "type": "Open Crack", "value": 5 },
  { "type": "Band Repaire", "value": 3 },
  { "type": "Welding Crack", "value": 3 }];

  dwlReworksData = [{ "type": "Band Repaire ", "value": 51 },
  { "type": "L4 Repaire ", "value": 19 },
  { "type": "Nave Damage ", "value": 13 },
  { "type": "OD< ", "value": 11 },
  { "type": "Rim Repaire ", "value": 8 },
  { "type": "Tool Mark ", "value": 5 },
  { "type": "Welding Crack ", "value": 4 }];

  shotBlastReworksData = [{ "type": "Grinding Mark", "value": 97 },
  { "type": "Ovel", "value": 3 }];

  paintLineReworksData = [{ "type": "Pin Hole", "value": 2 },
  { "type": "Paint Thicknes <", "value": 2 }];

  machineShopReworksData = [];

  shearingReworksData = [{ "type": "CB Ovel", "value": 17 },
  { "type": "Nave Damage", "value": 4 },
  { "type": "No Stamping", "value": 1 }];

  steelBandReworksData = [{ "type": "Band ID Ovel", "value": 8 },
  { "type": "Flash But Repaire", "value": 8 },
  { "type": "Over Expanding", "value": 8 },
  { "type": "Welding Repaire", "value": 8 },
  { "type": "Welding Crack", "value": 6 },
  { "type": "Tool Mark", "value": 4 },
  { "type": "Band Height >", "value": 4 },
  { "type": "Flash But Crack", "value": 1 }];

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData(dataSource: string, chartType: string) {
    let dataProvider = [];
    if (dataSource === 'awlReworks') {
      dataProvider = this.awlReworksData;
    } else if (dataSource === 'cwlReworks') {
      dataProvider = this.cwlReworksData;
    } else if (dataSource === 'dwlReworks') {
      dataProvider = this.dwlReworksData;
    } else if (dataSource === 'shotBlastReworks') {
      dataProvider = this.shotBlastReworksData;
    } else if (dataSource === 'paintLineReworks') {
      dataProvider = this.paintLineReworksData;
    } else if (dataSource === 'machineShopReworks') {
      dataProvider = this.machineShopReworksData;
    } else if (dataSource === 'shearingReworks') {
      dataProvider = this.shearingReworksData;
    } else if (dataSource === 'steelBandReworks') {
      dataProvider = this.steelBandReworksData;
    }

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardLine5ReworksBarChart;

    let barChartData =
      {
        "dataProvider": dataProvider,
        "type": "serial",
        "addClassNames": true,
        "theme": "blur",
        "rotate": true,
        "depth3D": 20,
        "angle": 30,
        "balloon": {
          "adjustBorderColor": false,
          "horizontalPadding": 10,
          "verticalPadding": 8,
          "color": "#ffffff"
        },
        "valueAxes": [{
          "axisAlpha": 0,
          "position": "left"
        }],
        "startDuration": 1,
        "graphs": [{
          "alphaField": "alpha",
          "balloonText": "<span style='font-size:12px;'>[[type]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
          "fillAlphas": 1,
          "title": "Value",
          "type": "column",
          "valueField": "value",
          "labelText": "[[value]]",
          "labelPosition": "right"
        }],
        "categoryField": "type",
        "categoryAxis": {
          "gridPosition": "start",
          "axisAlpha": 0,
          "tickLength": 0
        },
        "export": {
          "enabled": true
        }
      };

    let pieChartData = {
      "type": "pie",
      "theme": "blur",
      "balloon": {
        "adjustBorderColor": false,
        "horizontalPadding": 10,
        "verticalPadding": 8,
        "color": "#ffffff"
      },
      "dataProvider": dataProvider,
      "valueField": "value",
      "balloonText": "<span style='font-size:12px;'>[[type]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
      "depth3D": 5,
      "angle": 5,
      "export": {
        "enabled": true
      }
    };
    return chartType === 'pieChart' ? pieChartData : barChartData;
  };
}
