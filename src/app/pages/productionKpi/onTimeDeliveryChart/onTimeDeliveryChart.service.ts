import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class OnTimeDeliveryChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getChartData(data) {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardOnTimeDeliveryChart;

    return {
      'type': 'serial',
      'theme': 'blur',
      'dataProvider': data,
      creditsPosition: 'top-right',
      'valueAxes': [{
        minVerticalGap: 50,
        gridAlpha: 0,
        color: layoutColors.defaultText,
        axisColor: layoutColors.defaultText
      }],
      'gridAboveGraphs': true,
      'startDuration': 1,
      'graphs': [{
        'balloonText': '[[category]]: <b>[[percentage]]%</b>',
        'fillAlphas': 0.8,
        'lineAlpha': 0.2,
        'type': 'column',
        'valueField': 'percentage',
        'labelText': '[[percentage]]%',
        'title': 'Percentage'
      }],
      'chartCursor': {
        'categoryBalloonEnabled': false,
        'cursorAlpha': 0,
        'zoomable': false
      },
      'categoryField': 'month',
      'categoryAxis': {
        'gridPosition': 'start',
        'gridAlpha': 0,
        'tickPosition': 'start',
        'tickLength': 20,
        color: layoutColors.defaultText,
        axisColor: layoutColors.defaultText
      },
      'legend': {
        'position': 'top',
        'valueWidth': 100,
        'valueAlign': 'left'
      },
      'dataTableId': 'onTimeDeliverychartdata',
      'autoMargins': false,
      'marginLeft': 100,
      'marginRight': 0,
      'marginBottom': 25
    };

  };
}