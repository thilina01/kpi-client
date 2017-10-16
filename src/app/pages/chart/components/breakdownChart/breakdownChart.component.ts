import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { BaThemeConfigProvider } from '../../../../theme';

import { LossTypeService } from '../../../../services/lossType.service';
import { ChartService } from '../../chart.service';

@Component({
  selector: 'breakdown-chart',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./breakdownChart.scss'],
  templateUrl: './breakdownChart.html',
})
export class BreakdownChart {

  layoutColors = this.baConfig.get().colors;
  graphColor = this.baConfig.get().colors.custom.dashboardBreakdownChart;

  section = '0';
  startDate = '';
  endDate = '';
  categoryTitle = 'Category';
  selectedDay: any;


  amChart: any;
  amMttrChart: any;
  amMdtChart: any;
  dataProvider = [];

  chartData: Object = {
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

    'dataProvider': this.dataProvider,
    'valueAxes': [{
      'axisAlpha': 0,
      'position': 'left'
    }],
    'startDuration': 1,
    'graphs': [{
      'alphaField': 'alpha',
      'balloonText': '<span style="font-size:12px;">[[title]] in [[category]]:<br><span style="font-size:20px;">[[mtbf]]</span> [[additional]]</span>',
      'fillAlphas': 1,
      'title': 'mtbf',
      'type': 'column',
      'valueField': 'mtbf',
      'labelText': '[[mtbf]]'
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
      'title': 'mtbfTarget',
      'valueField': 'mtbfTarget',
      'dashLengthField': 'dashLengthLine',
      'labelText': '[[mtbfTarget]]',
      'labelPosition': 'top'
    }],
    'categoryField': 'section',
    'categoryAxis': {
      'gridPosition': 'start',
      'axisAlpha': 0,
      'tickLength': 0
    },
    'export': {
      'enabled': true
    }
  };
  mttrChartData: Object = {
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

    'dataProvider': this.dataProvider,
    'valueAxes': [{
      'axisAlpha': 0,
      'position': 'left'
    }],
    'startDuration': 1,
    'graphs': [{
      'alphaField': 'alpha',
      'balloonText': '<span style="font-size:12px;">[[title]] in [[category]]:<br><span style="font-size:20px;">[[mttr]]</span> [[additional]]</span>',
      'fillAlphas': 1,
      'title': 'mttr',
      'type': 'column',
      'valueField': 'mttr',
      'labelText': '[[mttr]]'
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
      'title': 'mttrTarget',
      'valueField': 'mttrTarget',
      'dashLengthField': 'dashLengthLine',
      'labelText': '[[mttrTarget]]',
      'labelPosition': 'top'
    }],
    'categoryField': 'section',
    'categoryAxis': {
      'gridPosition': 'start',
      'axisAlpha': 0,
      'tickLength': 0
    },
    'export': {
      'enabled': true
    }
  };

  mdtChartData: Object = {
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

    'dataProvider': this.dataProvider,
    'valueAxes': [{
      'axisAlpha': 0,
      'position': 'left'
    }],
    'startDuration': 1,
    'graphs': [{
      'alphaField': 'alpha',
      'balloonText': '<span style="font-size:12px;">[[title]] in [[category]]:<br><span style="font-size:20px;">[[mdt]]</span> [[additional]]</span>',
      'fillAlphas': 1,
      'title': 'mdt',
      'type': 'column',
      'valueField': 'mdt',
      'labelText': '[[mdt]]'
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
      'title': 'mdtTarget',
      'valueField': 'mdtTarget',
      'dashLengthField': 'dashLengthLine',
      'labelText': '[[mdtTarget]]',
      'labelPosition': 'top'
    }],
    'categoryField': 'section',
    'categoryAxis': {
      'gridPosition': 'start',
      'axisAlpha': 0,
      'tickLength': 0
    },
    'export': {
      'enabled': true
    }
  };

  constructor(private baConfig: BaThemeConfigProvider, private route: ActivatedRoute, private chartService: ChartService) {
  }

  fillCharts(): void {

    if (this.section == '0') {

      this.categoryTitle = 'Section';

      this.chartService.getBreakdown(this.startDate, this.endDate).subscribe((data) => {
        this.setData(data.json())
      });

    } else {
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.startDate = params['startDate'];
        this.endDate = params['endDate'];
        this.section = params['section'];
        this.fillCharts();
      }
    );
  }

  setData(data: any): void {
    this.dataProvider = data;

    this.amChart.dataProvider = data;
    this.amChart.validateData();

    this.amMttrChart.dataProvider = data;
    this.amMttrChart.validateData();

    this.amMdtChart.dataProvider = data;
    this.amMdtChart.validateData();
  }

  initChart(chart: any) {
    this.amChart = chart;
  }
  initMttrChart(chart: any) {
    this.amMttrChart = chart;
  }
  initMdtChart(chart: any) {
    this.amMdtChart = chart;
  }

}
