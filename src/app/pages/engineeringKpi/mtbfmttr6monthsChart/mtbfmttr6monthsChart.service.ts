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
      // 'depth3D': 20,
      // 'angle': 30,
      'balloon': {
        'adjustBorderColor': false,
        'horizontalPadding': 10,
        'verticalPadding': 8,
        'color': '#ffffff'
      },

      'dataProvider': [
        { 'month': ' Dec(2017)  ', 'mtbfInHours': 181.20, 'mttrInHours': 1.12 },
        { 'month': ' Jan(2018)  ', 'mtbfInHours': 107.51, 'mttrInHours': 0.88 },
        { 'month': ' Feb(2018)  ', 'mtbfInHours': 133.18, 'mttrInHours': 1.28 },
        { 'month': ' Mar(2018)  ', 'mtbfInHours': 166.33, 'mttrInHours': 1.18 },
        { 'month': ' Apr(2018)  ', 'mtbfInHours': 548.18, 'mttrInHours': 0.70 },
        { 'month': ' May(2018)  ', 'mtbfInHours': 252.25, 'mttrInHours': 1.03 }
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
        'valueField': 'mtbfInHours',
        'labelText': '[[mtbfInHours]]',
        'fontSize': 20,
        'labelPosition': 'top'
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
        'valueField': 'mttrInHours',
        'dashLengthField': 'dashLengthLine',
        'labelText': '[[mttrInHours]]',
        'fontSize': 20,
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
