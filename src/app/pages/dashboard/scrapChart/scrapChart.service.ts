import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class ScrapChartService {

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getData() {

    let layoutColors = this._baConfig.get().colors;
    let graphColor = this._baConfig.get().colors.custom.dashboardScrapChart;

    return {
      "type": "serial",
      "theme": "blur",
      "depth3D": 20,
      "angle": 30,
      "dataProvider": [
        { "section": "AWL", "value": 39 },
        { "section": "CWL", "value": 1 },
        { "section": "DWL", "value": 15 },
        { "section": "1500 Press", "value": 18 }
      ],
      creditsPosition: 'top-right',
      "valueAxes": [{
        minVerticalGap: 50,
        gridAlpha: 0,
        color: layoutColors.defaultText,
        axisColor: layoutColors.defaultText
      }],
      "gridAboveGraphs": true,
      "startDuration": 1,
      "graphs": [{
        "balloonText": "[[category]]: <b>[[value]]</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "value",
        //"fixedColumnWidth": 80,
        "labelText": "[[value]]",
        "labelPosition": "left"
      }],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "categoryField": "section",
      "categoryAxis": {
        "gridPosition": "start",
        "gridAlpha": 0,
        "tickPosition": "start",
        "tickLength": 20,
        color: layoutColors.defaultText,
        axisColor: layoutColors.defaultText
      }
      /*
      type: 'serial',
      theme: 'blur',
      marginTop: 15,
      marginRight: 15,
      responsive: {
        'enabled': true
      },
      dataProvider: [
        { date: new Date(2012, 11), value: 0, value0: 0 },
        { date: new Date(2013, 0), value: 15000, value0: 19000 },
        { date: new Date(2013, 1), value: 30000, value0: 20000 },

        { date: new Date(2013, 2), value: 25000, value0: 22000 },
        { date: new Date(2013, 3), value: 21000, value0: 25000 },
        { date: new Date(2013, 4), value: 24000, value0: 29000 },
        { date: new Date(2013, 5), value: 31000, value0: 26000 },
        { date: new Date(2013, 6), value: 40000, value0: 25000 },
        { date: new Date(2013, 7), value: 37000, value0: 20000 },
        { date: new Date(2013, 8), value: 18000, value0: 22000 },
        { date: new Date(2013, 9), value: 5000, value0: 26000 },
        { date: new Date(2013, 10), value: 40000, value0: 30000 },
        { date: new Date(2013, 11), value: 20000, value0: 25000 },
        { date: new Date(2014, 0), value: 5000, value0: 13000 },

        { date: new Date(2014, 1), value: 3000, value0: 13000 },
        { date: new Date(2014, 2), value: 1800, value0: 13000 },
        { date: new Date(2014, 3), value: 10400, value0: 13000 },
        { date: new Date(2014, 4), value: 25500, value0: 13000 },
        { date: new Date(2014, 5), value: 2100, value0: 13000 },
        { date: new Date(2014, 6), value: 6500, value0: 13000 },
        { date: new Date(2014, 7), value: 1100, value0: 13000 },
        { date: new Date(2014, 8), value: 17200, value0: 13000 },
        { date: new Date(2014, 9), value: 26900, value0: 13000 },
        { date: new Date(2014, 10), value: 14100, value0: 13000 },
        { date: new Date(2014, 11), value: 35300, value0: 13000 },
        { date: new Date(2015, 0), value: 54800, value0: 13000 },
        { date: new Date(2015, 1), value: 49800, value0: 13000 }
      ],
      categoryField: 'date',
      categoryAxis: {
        parseDates: true,
        gridAlpha: 0,
        color: layoutColors.defaultText,
        axisColor: layoutColors.defaultText
      },
      valueAxes: [
        {
          minVerticalGap: 50,
          gridAlpha: 0,
          color: layoutColors.defaultText,
          axisColor: layoutColors.defaultText
        }
      ],
      graphs: [
        {
          id: 'g0',
          bullet: 'none',
          useLineColorForBulletBorder: true,
          lineColor: colorHelper.hexToRgbA(graphColor, 0.3),
          lineThickness: 1,
          negativeLineColor: layoutColors.danger,
          type: 'smoothedLine',
          valueField: 'value0',
          fillAlphas: 1,
          fillColorsField: 'lineColor'
        },
        {
          id: 'g1',
          bullet: 'none',
          useLineColorForBulletBorder: true,
          lineColor: colorHelper.hexToRgbA(graphColor, 0.15),
          lineThickness: 1,
          negativeLineColor: layoutColors.danger,
          type: 'smoothedLine',
          valueField: 'value',
          fillAlphas: 1,
          fillColorsField: 'lineColor'
        }
      ],
      chartCursor: {
        categoryBalloonDateFormat: 'MM YYYY',
        categoryBalloonColor: '#4285F4',
        categoryBalloonAlpha: 0.7,
        cursorAlpha: 0,
        valueLineEnabled: true,
        valueLineBalloonEnabled: true,
        valueLineAlpha: 0.5
      },
      dataDateFormat: 'MM YYYY',
      export: {
        enabled: true
      },
      creditsPosition: 'bottom-right',
      zoomOutButton: {
        backgroundColor: '#fff',
        backgroundAlpha: 0
      },
      zoomOutText: '',
      pathToImages: layoutPaths.images.amChart
      */
    };
  }
}
