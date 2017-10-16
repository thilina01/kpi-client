import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class EnergyCostMainChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {
    let layoutColors = this._baConfig.get().colors;
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
      'numberFormatter': { precision: -1, decimalSeparator: '.', thousandsSeparator: ',' },

      'dataProvider': [],
      'valueAxes': [{
        'id': 'v2',
        'axisAlpha': 0,
        'position': 'right'
      }],
      'startDuration': 1,
      'graphs': [{
        'valueAxis': 'v2',
        'id': 'graph2',
        'balloonText': '<span style="font-size:12px;">[[title]] in [[category]]:<br><span style="font-size:20px;">[[cost]]</span> [[additional]]</span>',
        'bullet': 'round',
        'lineThickness': 3,
        'bulletSize': 7,
        'bulletBorderAlpha': 1,
        'bulletColor': '#FFFFFF',
        'lineColor': '#f95372',
        'useLineColorForBulletBorder': true,
        'bulletBorderThickness': 3,
        'fillAlphas': 0,
        'lineAlpha': 1,
        'thousandsSeparator': ',',
        'title': 'Cost',
        'valueField': 'cost',
        'dashLengthField': 'dashLengthLine',
        'labelText': '[[cost]]',
        'labelPosition': 'bottom'
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
