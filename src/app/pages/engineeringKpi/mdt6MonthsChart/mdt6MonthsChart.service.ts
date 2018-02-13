import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class Mdt6MonthsChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardMdt6MonthsChart;

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
        { 'month': ' Aug(2017)  ', 'mdt': 0.7, 'target': 1.1 },
        { 'month': ' Sep(2017)  ', 'mdt': 1.0, 'target': 1.1 },
        { 'month': ' Oct(2017)  ', 'mdt': 0.9, 'target': 1.1 },
        { 'month': ' Nov(2017)  ', 'mdt': 0.9, 'target': 1.1 },
        { 'month': ' Dec(2017)  ', 'mdt': 0.6, 'target': 1.1 },
        { 'month': ' Jan(2018)  ', 'mdt': 0.8, 'target': 1.1 }

      ],
      'valueAxes': [{
        'id':'v1',
        'axisAlpha': 0,
        'position': 'left'
      }],
      'startDuration': 1,
      'graphs': [{
        'alphaField': 'alpha',
        'balloonText': '<span style="font-size:12px;">[[title]] in [[category]]:<br><span style="font-size:20px;">[[value]]</span> [[additional]]</span>',
        'fillAlphas': 1,
        'title': 'MDT',
        'type': 'column',
        'valueField': 'mdt',
        'labelText': '[[mdt]]%'
      }, {
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
        'title': 'Target',
        'valueField': 'target',
        'dashLengthField': 'dashLengthLine',
        'labelText': '[[target]]%',
        'labelPosition': 'top'
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
