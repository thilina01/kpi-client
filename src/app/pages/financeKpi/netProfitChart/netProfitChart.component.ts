import { Component } from '@angular/core';

import { NetProfitChartService } from './netProfitChart.service';


import 'style-loader!./netProfitChart.scss';
import { ChartService } from '../../chart/chart.service';

@Component({
  selector: 'net-profit-chart',
  templateUrl: './netProfitChart.html'
})
export class NetProfitChart {

  amChart: any;
  chartData: any;

  constructor(private _netProfitChartService: NetProfitChartService, private chartService: ChartService) {
    this.chartData = this._netProfitChartService.getChartData([]);
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    let monthText: string;
    monthText = ((startDate.getMonth() + 1) < 10 ? '0' + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + '';
    let startDateText = startDate.getFullYear() + '-' + monthText.slice(-2) + '-01';

    let endDate = new Date();
    let endDateText = endDate.getFullYear() + '-' + (endDate.getMonth() < 10 ? '0' + endDate.getMonth() : endDate.getMonth()) + '-' + (new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyNetProfit(startDateText, endDateText).subscribe((data) => {
      this.amChart.dataProvider = data.json();
      this.amChart.validateData();
      this.fillTable(this.amChart);
    });
  }

  initChart(chart: any) {
    this.amChart = chart;
  }

  fillTable(chart: any) {

    // check if export to table is enabled
    if (chart.dataTableId === undefined)
      return;

    // get chart data
    let data = chart.dataProvider;

    // create a table
    let holder = document.getElementById(chart.dataTableId);
    let table = document.createElement('table');
    holder.appendChild(table);
    let tr, td;

    // construct table
    for (let i = 0; i < chart.graphs.length; i++) {

      // add rows
      tr = document.createElement('tr');
      tr.setAttribute('data-valuefield', chart.graphs[i].valueField);
      table.appendChild(tr);
      td = document.createElement('td');
      td.className = 'row-title';
      td.innerHTML = chart.graphs[i].title;
      tr.appendChild(td);

      for (let x = 0; x < chart.dataProvider.length; x++) {
        td = document.createElement('td');
        td.innerHTML = chart.dataProvider[x][chart.graphs[i].valueField];
        tr.appendChild(td);
      }
    }
  };
}
