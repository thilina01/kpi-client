import { Component, Input } from '@angular/core';

import { EnergyCostMainChartService } from './energyCostMainChart.service';

import 'style-loader!./energyCostMainChart.scss';
import { ChartService } from "../../chart/chart.service";

@Component({
  selector: 'energy-cost-main-chart',
  templateUrl: './energyCostMainChart.html'
})
export class EnergyCostMainChart {

  @Input('dataSource')
  public dataSource: string;

  @Input('location')
  public location: string;

  chartData: Object;
  amChart: any;

  constructor(private _energyCostMainChartService: EnergyCostMainChartService, private chartService: ChartService) {
  }

  ngOnInit(): void {
    this.chartData = this._energyCostMainChartService.getData();
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    let monthText: string;
    monthText = ((startDate.getMonth() + 1) < 10 ? "0" + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + "";
    let startDateText = startDate.getFullYear() + "-" + monthText.slice(-2) + "-01";
    let endDate = new Date();
    let endDateText = endDate.getFullYear() + "-" + (endDate.getMonth() < 10 ? "0" + endDate.getMonth() : endDate.getMonth()) + "-" + (new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyEnergyConsumptionByLocation(startDateText, endDateText, this.location).subscribe((data) => {
      this.amChart.dataProvider = data;
      this.amChart.validateData();
    });
  }

  initChart(chart: any) {
    this.amChart = chart;
    let zoomChart = () => {

    };

    chart.addListener('rendered', zoomChart);
    zoomChart();

    if (chart.zoomChart) {
      chart.zoomChart();
    }
  }
}
