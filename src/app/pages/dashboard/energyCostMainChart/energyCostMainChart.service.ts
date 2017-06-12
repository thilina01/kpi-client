import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class EnergyCostMainChartService {
  /*
  mainEnergyCostData = [
    { "month": " Aug-16", "cost": 1601725.47 },
    { "month": " Sep-16", "cost": 1710207 },
    { "month": " Oct-16", "cost": 1157336.7 },
    { "month": " Nov-16", "cost": 1157383.33 },
    { "month": " Dec-16", "cost": 1163750.58 },
    { "month": " Jan-17", "cost": 851838.42 },
    { "month": " Feb-17", "cost": 1371072.24 },
    { "month": " Mar-17", "cost": 1343210.07 }
  ];
  paintEnergyCostData = [
    { "month": " Jul-16", "cost": 476373.1 },
    { "month": " Aug-16", "cost": 470726 },
    { "month": " Sep-16", "cost": 353112 },
    { "month": " Oct-16", "cost": 355097.75 },
    { "month": " Nov-16", "cost": 399425.8 },
    { "month": " Dec-16", "cost": 355091.75 },
    { "month": " Jan-17", "cost": 274256.45},
    { "month": " Feb-17", "cost": 468636.20 },
    { "month": " Mar-17", "cost": 469097.15 }
  ];*/
  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData(/*dataSource: string*/) {
    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardEnergyCostMainChart;
/*
    let dataProvider = [];
    if (dataSource === 'main') {
      dataProvider = this.mainEnergyCostData;
    } else if (dataSource === 'paint') {
      dataProvider = this.paintEnergyCostData;
    }
*/
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
      "numberFormatter": { precision: -1, decimalSeparator: '.', thousandsSeparator: ',' },

      "dataProvider": [],//dataProvider,
      "valueAxes": [{
        "id": "v2",
        "axisAlpha": 0,
        "position": "right"
      }],
      "startDuration": 1,
      "graphs": [{
        "valueAxis": "v2",
        "id": "graph2",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[cost]]</span> [[additional]]</span>",
        "bullet": "round",
        "lineThickness": 3,
        "bulletSize": 7,
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "lineColor": "#f95372",
        "useLineColorForBulletBorder": true,
        "bulletBorderThickness": 3,
        "fillAlphas": 0,
        "lineAlpha": 1,
        "thousandsSeparator": ",",
        "title": "Cost",
        "valueField": "cost",
        "dashLengthField": "dashLengthLine",
        "labelText": "[[cost]]",
        //"labelRotation": -30,
        "labelPosition": "bottom"
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
