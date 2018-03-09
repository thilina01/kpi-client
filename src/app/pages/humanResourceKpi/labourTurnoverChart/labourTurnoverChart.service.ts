import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class LabourTurnoverChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getChartData(data) {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardLabourTurnoverChart;

    let graphMap = {};
    let graphs = [];
    let dataMap = {};
    let dataProvider = [];
    data.forEach(function (dataItem) {
      // create a new graph if we did not already create one
      if (graphMap[dataItem.source] === undefined) {
        graphMap[dataItem.source] = 1;
        graphs.push({
          valueField: dataItem.source,
          title: dataItem.source,
          type: 'column',
          labelText: '[[value]]%',
          labelOffset: 10,
          fillAlphas: 1,
          balloonText: '<b>' + dataItem.source + '</b>: [[value]]%'
        });
      }
      // create a new object for the month if not already created
      if (dataMap[dataItem.month] === undefined) {
        dataMap[dataItem.month] = { month: dataItem.month };
      }
      // add new source information and set target information for that month.
      dataMap[dataItem.month][dataItem.source] = dataItem.turnover;
      dataMap[dataItem.month].target = dataItem.target;
    });
    // add the target line
    graphs.push({
      valueField: 'target',
      title: 'Target',
      lineThickness: 2,
      labelText: '[[value]]%',
      bullet: 'round',
      balloonText: '<b>Target</b>: [[value]]'
    });

    // convert dataMap to an array sorted by date
    Object.keys(dataMap).sort(function (lhs, rhs) {
      return new Date(lhs).getDate() - new Date(rhs).getDate();
    }).forEach(function (month) {
      dataProvider.push(dataMap[month]);
    });


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

      'legend': {
        'horizontalGap': 10,
        'maxColumns': 5,
        'position': 'top',
        'useGraphSettings': true,
        'markerSize': 10
      },
      'dataProvider': dataProvider,
      'valueAxes': [{
        'id': 'v1',
        'axisAlpha': 0,
        'position': 'left'
      }],
      'startDuration': 1,
      'graphs': graphs,
      'categoryField': 'month',
      // 'dataDateFormat': 'YYYY-MM',
      //   'categoryAxis':{
      //   parseDates: true,
      //   minPeriod: 'MM',
      //   dateFormats: [{'period':'fff','format':'JJ:NN:SS'},{'period':'ss','format':'JJ:NN:SS'},{'period':'mm','format':'JJ:NN'},{'period':'hh','format':'JJ:NN'},{'period':'DD','format':'MMM DD'},{'period':'WW','format':'MMM DD'},{'period':'MM','format':'YYYY-MM'},{'period':'YYYY','format':'YYYY'}]
      // },
      'export': {
        'enabled': true
      }
    };
  };
}
