import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class MtbfMttr6MonthsChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardMtbfMttr6MonthsChart;

    return {
      'type': 'serial',
      'addClassNames': true,
      'theme': 'blur',
      'depth3D': 20,
      'angle': 30,
      'balloon': {
        'adjustBorderColor': false,
        'horizontalPadding': 10,
        'verticalPadding': 8,
        'color': '#ffffff'
      },

      'dataProvider': [
        { 'month': ' Sep(2017)  ', 'mtbf': 121.65, 'mttr': 1.17 },
        { 'month': ' Oct(2017)  ', 'mtbf': 164.77, 'mttr': 1.53 },
        { 'month': ' Nov(2017)  ', 'mtbf': 156.73, 'mttr': 1.42 },
        { 'month': ' Dec(2017)  ', 'mtbf': 181.20, 'mttr': 1.12 },
        { 'month': ' Jan(2018)  ', 'mtbf': 107.51, 'mttr': 0.88 },
        { 'month': ' Feb(2018)  ', 'mtbf': 133.18, 'mttr': 1.28 }
      ],
      'valueAxes': [{
        'id': 'v1',
        'axisAlpha': 0,
        'position': 'left'
      }, {
        'id': 'v2',
        'axisAlpha': 0,
        'position': 'right'
      }],
      'startDuration': 1,
      'graphs': [{
        'valueAxis': 'v1',
        'alphaField': 'alpha',
        'balloonText': '<span style="font-size:12px;">[[title]] in [[category]]:<br><span style="font-size:20px;">[[value]]</span> [[additional]]</span>',
        'fillAlphas': 1,
        'title': 'MTBF',
        'type': 'column',
        'valueField': 'mtbf',
        'labelText': '[[mtbf]]',
        'labelPosition': 'left'
      }, {
        'valueAxis': 'v2',
        'id': 'graph2',
        'balloonText': '<span style="font-size:12px;">[[title]] in [[category]]:<br><span style="font-size:20px;">[[value]]</span> [[additional]]</span>',
        'bullet': 'round',
        'lineThickness': 3,
        'bulletSize': 7,
        'bulletBorderAlpha': 1,
        'bulletColor': '#FFFFFF',
        'useLineColorForBulletBorder': true,
        'bulletBorderThickness': 3,
        'fillAlphas': 0,
        'lineAlpha': 1,
        'title': 'MTTR',
        'valueField': 'mttr',
        'dashLengthField': 'dashLengthLine',
        'labelText': '[[mttr]]',
        'labelPosition': 'right'
      }],
      'categoryField': 'month',
      'categoryAxis': {
        'gridPosition': 'start',
        'axisAlpha': 0,
        'tickLength': 0
      },
      'export': {
        'enabled': true
      }
    };
  };
}
