import { Component } from '@angular/core';

import { OnTimeDeliveryChartService } from './onTimeDeliveryChart.service';


import 'style-loader!./onTimeDeliveryChart.scss';
import { ChartService } from '../../chart/chart.service';
import { CustomerService } from '../../customer/customer.service';

@Component({
  selector: 'on-time-delivery-chart',
  templateUrl: './onTimeDeliveryChart.html'
})
export class OnTimeDeliveryChart {

  amChart: any;
  chartData: any;
  startDate = new Date();
  endDate = new Date();
  startDateText: string;
  endDateText: string;

  constructor(
    private _onTimeDeliveryChartService: OnTimeDeliveryChartService,
    private chartService: ChartService,
    private customerService: CustomerService) {

    this.chartData = this._onTimeDeliveryChartService.getChartData([]);
    this.startDate.setMonth(this.startDate.getMonth() - 6);
    let monthText: string;
    monthText = ((this.startDate.getMonth() + 1) < 10 ? '0' + (this.startDate.getMonth() + 1) : (this.startDate.getMonth() + 1)) + '';
    //alert(monthText+' ~ '+ monthText.slice(-2))
    this.startDateText = this.startDate.getFullYear() + '-' + monthText.slice(-2) + '-01';

    this.endDateText = this.endDate.getFullYear() + '-' + (this.endDate.getMonth() < 10 ? '0' + this.endDate.getMonth() : this.endDate.getMonth()) + '-' + (new Date(this.endDate.getFullYear(), this.endDate.getMonth(), 0).getDate());
    this.getData();

  }

  fillChart(data: any): void {
    this.amChart.dataProvider = data.json();
    this.amChart.validateData();
    this.chartService.fillTable(this.amChart);
  }

  getData(): void {
    if (this.customer.id === 0) {
      this.chartService.getMonthlyOnTimeDelivery(this.startDateText, this.endDateText).subscribe((data) => {
        this.fillChart(data);
      });
    } else {
      this.chartService.getMonthlyOnTimeDeliveryByCustomer(this.startDateText, this.endDateText, this.customer.id).subscribe((data) => {
        this.fillChart(data);
      });
    }
  }

  ngOnInit(): void {
    this.getCustomerList();
  }

  initChart(chart: any) {
    this.amChart = chart;
  }

  getCustomerList(): void {
    this.customerService.getCombo().subscribe(customerList => {
      this.customerList = customerList;
      this.customerList.unshift(this.customer);
    });
  }

  /*================== CustomerFilter ===================*/
  customerList = [];
  filteredCustomerList: any[];
  customer: any = { 'id': 0, 'code': 'ALL', 'name': 'All Customers' };

  filterCustomerList(event) {
    let query = event.query.toLowerCase();
    this.filteredCustomerList = [];
    for (let i = 0; i < this.customerList.length; i++) {
      let customer = this.customerList[i];
      if (customer.code.toLowerCase().indexOf(query) === 0 || customer.name.toLowerCase().indexOf(query) === 0) {
        this.filteredCustomerList.push(customer);
      }
    }
  }

  handleCustomerDropdownClick() {
    this.filteredCustomerList = [];
    //mimic remote call
    setTimeout(() => {
      this.filteredCustomerList = this.customerList;
    }, 100);
  }

  onCustomerSelect(event: any) {
    this.setDisplayOfCustomer();
    this.getData();
  }

  setDisplayOfCustomer() {
    if (this.customer != null && this.customer !== undefined) {
      let display = this.customer.code != null && this.customer.code !== undefined ? this.customer.code + ' : ' : '';
      display += this.customer.name != null && this.customer.name !== undefined ? this.customer.name : '';
      this.customer.display = display;
    }
  }
}
