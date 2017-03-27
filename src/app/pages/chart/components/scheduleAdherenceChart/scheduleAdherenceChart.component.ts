import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { BaThemeConfigProvider } from '../../../../theme';

import { ChartService } from '../../../../services/chart.service';
@Component({
  selector: 'schedule-adherence-chart',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./scheduleAdherenceChart.scss'],
  templateUrl: './scheduleAdherenceChart.html',
})
export class ScheduleAdherenceChart {

  layoutColors = this.baConfig.get().colors;
  graphColor = this.baConfig.get().colors.custom.dashboardScheduleAdherenceChart;

  section = '0';
  startDate = '';
  endDate = '';
  lossReasonSummaryData = [];
  dateLossReasonSummaryData = [];
  dateLossReasonSummaryByLossReasonData = [];
  lossReasonDailyCountData = [];
  categoryTitle = "Category";
  selectedDay: any;


  amChart: any;
  lossByReasonChart: any;
  dataProvider = [];
  chartData: Object = {
    "id": 1,
    "type": "serial",
    "theme": "blur",
    "depth3D": 20,
    "angle": 30,
    "dataProvider": this.dataProvider,
    creditsPosition: 'top-right',
    "valueAxes": [{
      minVerticalGap: 50,
      gridAlpha: 0,
      color: this.layoutColors.defaultText,
      axisColor: this.layoutColors.defaultText
    }],
    "gridAboveGraphs": true,
    "startDuration": 1,
    "graphs": [{
      "balloonText": "[[category]]: <b>[[value]]%</b> <br/> [[actualTotal]] / [[plannedTotal]]",
      "fillAlphas": 0.8,
      "lineAlpha": 0.2,
      "type": "column",
      "valueField": "value",
      //"fixedColumnWidth": 80,
      "labelText": "[[value]]%"
    }],
    "chartCursor": {
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    },
    "categoryField": "category",
    "categoryAxis": {
      "gridPosition": "start",
      "gridAlpha": 0,
      "tickPosition": "start",
      "tickLength": 20,
      color: this.layoutColors.defaultText,
      axisColor: this.layoutColors.defaultText
    }
  };

  lossByReasonChartData: Object = {
    "id": 1,
    "type": "serial",
    "theme": "blur",
    "depth3D": 20,
    "angle": 30,
    "dataProvider": this.lossReasonSummaryData,
    creditsPosition: 'top-right',
    "valueAxes": [{
      minVerticalGap: 50,
      gridAlpha: 0,
      color: this.layoutColors.defaultText,
      axisColor: this.layoutColors.defaultText
    }],
    "gridAboveGraphs": true,
    "startDuration": 1,
    "graphs": [{
      "balloonText": "[[code]]: <b>[[total]]</b> ",
      "fillAlphas": 0.8,
      "lineAlpha": 0.2,
      "type": "column",
      "valueField": "total",
      //"fixedColumnWidth": 80,
      "labelText": "[[total]]",
      "labelPosition": "top"
    }],
    "chartCursor": {
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    },
    "categoryField": "code",
    "categoryAxis": {
      "gridPosition": "start",
      "gridAlpha": 0,
      "tickPosition": "start",
      "tickLength": 20,
      color: this.layoutColors.defaultText,
      axisColor: this.layoutColors.defaultText
    }
  };


  constructor(private baConfig: BaThemeConfigProvider, private route: ActivatedRoute, private chartService: ChartService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.clearData();
        this.startDate = params['startDate'];
        this.endDate = params['endDate'];
        this.section = params['section'];
        if (this.section == '0') {
          this.chartService.getScheduleAdherence(this.startDate, this.endDate).then((data) => {
            this.setData(data)
          });

          this.chartService.getLossReasonSummary(this.startDate, this.endDate).then((data) => {
            this.setLossReasonSummaryData(data)
          });

          this.chartService.getLossReasonDailyCount(this.startDate, this.endDate).then((data) => {
            this.setLossReasonDailyCountData(data)
          });

          this.categoryTitle = "Section";
        } else {

          this.categoryTitle = "Date";
          this.chartService.getScheduleAdherenceBySection(this.startDate, this.endDate, this.section).then((data) => {
            this.setData(data)
          });

          this.chartService.getLossReasonSummaryBySection(this.startDate, this.endDate, this.section).then((data) => {
            this.setLossReasonSummaryData(data)
          });

          this.chartService.getLossReasonDailyCountBySection(this.startDate, this.endDate, this.section).then((data) => {
            this.setLossReasonDailyCountData(data)
          });

        }
      }
    );
  }

  clearData() {
    this.lossReasonSummaryData = [];
    this.dateLossReasonSummaryData = [];
    this.dateLossReasonSummaryByLossReasonData = [];
    this.lossReasonDailyCountData = [];
  }

  setData(data: any): void {
    this.dataProvider = data;
    this.amChart.dataProvider = data;
    this.amChart.validateData();
  }

  setLossReasonSummaryData(data: any): void {
    this.lossReasonSummaryData = data;
    this.lossByReasonChart.dataProvider = data;
    this.lossByReasonChart.validateData();
  }

  setLossReasonDailyCountData(data: any): void {
    this.lossReasonDailyCountData = data;
  }

  onRowSelect(event) {
    if (this.section == '0') {
      this.chartService.getLossReasonSummary(event.data.date, event.data.date).then((data) => {
        this.dateLossReasonSummaryData = data;
      });
    } else {
      this.chartService.getLossReasonSummaryBySection(event.data.date, event.data.date, this.section).then((data) => {
        this.dateLossReasonSummaryData = data;
      });
    }
  }

  onLossByRedonRowSelect(event) {
    if (this.section == '0') {
      this.chartService.getLossReasonDailyCountByLossReason(this.startDate, this.endDate, event.data.id).then((data) => {
        this.dateLossReasonSummaryByLossReasonData = data;
      });
    } else {
      this.chartService.getLossReasonDailyCountBySectionAndLossReason(this.startDate, this.endDate, this.section, event.data.id).then((data) => {
        this.dateLossReasonSummaryByLossReasonData = data;
      });
    }
  }

  initChart(chart: any) {
    this.amChart = chart;
  }
  
  initLossByReasonChart(chart: any) {
    this.lossByReasonChart = chart;
  }
}
