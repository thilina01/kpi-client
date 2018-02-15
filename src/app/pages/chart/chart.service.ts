import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';

import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ChartService {

  selectionChange: Subject<any> = new Subject<any>();
  private headers: Headers; // = new Headers({ 'Content-Type': 'application/json' });
  private apiUrl: string;  // URL to web api

  constructor(private http: Http, @Inject(APP_CONFIG) private config: IAppConfig, private authService: AuthService) {
    this.apiUrl = config.apiEndpoint + 'chart/';
  }

  fillTable(chart: any) {

    // check if export to table is enabled
    if (chart.dataTableId === undefined)
      return;

    // get chart data
    let data = chart.dataProvider;

    // create a table
    let holder = document.getElementById(chart.dataTableId);
    holder.innerHTML = '';
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

  getScrap(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'scrap?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getScrapBySection(startDate: string, endDate: string, section: string): Observable<any> {
    return this.http.get(this.apiUrl + 'scrapBySection?startDate=' + startDate + '&endDate=' + endDate + '&section=' + section)
      .catch(err => this.handleError(err));
  }

  getScrapReasonSummary(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'scrapReasonSummary?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getScrapReasonSummaryBySection(startDate: string, endDate: string, section: string): Observable<any> {
    return this.http.get(this.apiUrl + 'scrapReasonSummaryBySection?startDate=' + startDate + '&endDate=' + endDate + '&section=' + section)
      .catch(err => this.handleError(err));
  }

  getScrapReasonSummaryByLossReason(startDate: string, endDate: string, lossReason: string): Observable<any> {
    return this.http.get(this.apiUrl + 'scrapReasonSummaryByLossReason?startDate=' + startDate + '&endDate=' + endDate + '&lossReason=' + lossReason)
      .catch(err => this.handleError(err));
  }

  getScrapReasonSummaryBySectionAndLossReason(startDate: string, endDate: string, section: string, lossReason: string): Observable<any> {
    return this.http.get(this.apiUrl + 'scrapReasonSummaryBySectionAndLossReason?startDate=' + startDate + '&endDate=' + endDate + '&section=' + section + '&lossReason=' + lossReason)
      .catch(err => this.handleError(err));
  }

  getBreakdown(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'breakdown?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getBreakdownBySection(startDate: string, endDate: string, section: string): Observable<any> {
    return this.http.get(this.apiUrl + 'breakdownBySection?startDate=' + startDate + '&endDate=' + endDate + '&section=' + section)
      .catch(err => this.handleError(err));
  }

  getScheduleAdherence(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'scheduleAdherence?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getMonthlySalesWeight(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlySalesWeight?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getMonthlySalesValue(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlySalesValue?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));;
  }

  getMonthlyConsumableCostPerKgChart(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlyConsumableCostPerKg?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getMonthlyCumulativeSalesPerKg(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlyCumulativeSalesPerKg?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getMonthlyElectricityCostPerKg(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlyElectricityCostPerKg?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getMonthlyScrapCostPerKg(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlyScrapCostPerKg?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getMonthlyLabourCostPerKg(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlyLabourCostPerKg?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getMonthlyMaterialCostPerKg(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlyMaterialCostPerKg?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getMonthlyProductionOverheadCostPerKg(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlyProductionOverheadCostPerKg?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getMonthlySalesPerKg(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlySalesPerKg?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getMonthlyScheduleAdherence(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlyScheduleAdherence?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getMonthlyScrapValue(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlyScrapValue?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }
  getMonthlyOnTimeDelivery(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlyOnTimeDelivery?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getMonthlyOnTimeDeliveryByCustomer(startDate: string, endDate: string, customer: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlyOnTimeDeliveryByCustomer?startDate=' + startDate + '&endDate=' + endDate + '&customer=' + customer)
      .catch(err => this.handleError(err));
  }

  getMonthlyLabourTurnover(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlyLabourTurnover?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getMonthlyAbsenteeism(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlyAbsenteeism?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getMonthlyEnergyConsumptionByLocation(startDate: string, endDate: string, location: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlyEnergyConsumptionByLocation?startDate=' + startDate + '&endDate=' + endDate + '&location=' + location)
      .catch(err => this.handleError(err));
  }

  getScheduleAdherenceBySection(startDate: string, endDate: string, section: string): Observable<any> {
    return this.http.get(this.apiUrl + 'scheduleAdherenceBySection?startDate=' + startDate + '&endDate=' + endDate + '&section=' + section)
      .catch(err => this.handleError(err));
  }

  getScheduleAdherenceBySectionAndLossType(startDate: string, endDate: string, section: string, lossTypeId: string): Observable<any> {
    return this.http.get(this.apiUrl + 'scheduleAdherenceBySectionAndLossType?startDate=' + startDate + '&endDate=' + endDate + '&section=' + section + '&lossType=' + lossTypeId)
      .catch(err => this.handleError(err));
  }

  getLossReasonSummaryBySection(startDate: string, endDate: string, section: string): Observable<any> {
    return this.http.get(this.apiUrl + 'lossReasonSummaryBySection?startDate=' + startDate + '&endDate=' + endDate + '&section=' + section)
      .catch(err => this.handleError(err));
  }

  getLossReasonSummaryBySectionAndLossType(startDate: string, endDate: string, section: string, lossTypeId: string): Observable<any> {
    return this.http.get(this.apiUrl + 'lossReasonSummaryBySectionAndLossType?startDate=' + startDate + '&endDate=' + endDate + '&section=' + section + '&lossType=' + lossTypeId)
      .catch(err => this.handleError(err));
  }

  getLossReasonSummary(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'lossReasonSummary?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getLossReasonSummaryByLossType(startDate: string, endDate: string, lossTypeId: string): Observable<any> {
    return this.http.get(this.apiUrl + 'lossReasonSummaryByLossType?startDate=' + startDate + '&endDate=' + endDate + '&lossType=' + lossTypeId)
      .catch(err => this.handleError(err));
  }

  getLossReasonDailyCountBySection(startDate: string, endDate: string, section: string): Observable<any> {
    return this.http.get(this.apiUrl + 'lossReasonDailyCountBySection?startDate=' + startDate + '&endDate=' + endDate + '&section=' + section)
      .catch(err => this.handleError(err));
  }

  getLossReasonDailyCountBySectionAndLossType(startDate: string, endDate: string, section: string, lossTypeId: string): Observable<any> {
    return this.http.get(this.apiUrl + 'lossReasonDailyCountBySectionAndLossType?startDate=' + startDate + '&endDate=' + endDate + '&section=' + section + '&lossType=' + lossTypeId)
      .catch(err => this.handleError(err));
  }

  getLossReasonDailyCount(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'lossReasonDailyCount?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getLossReasonDailyCountByLossType(startDate: string, endDate: string, lossTypeId: string): Observable<any> {
    return this.http.get(this.apiUrl + 'lossReasonDailyCountByLossType?startDate=' + startDate + '&endDate=' + endDate + '&lossType=' + lossTypeId)
      .catch(err => this.handleError(err));
  }

  getLossReasonDailyCountBySectionAndLossReason(startDate: string, endDate: string, section: string, lossReason: string): Observable<any> {
    return this.http.get(this.apiUrl + 'lossReasonDailyCountBySectionAndLossReason?startDate=' + startDate + '&endDate=' + endDate + '&section=' + section + '&lossReason=' + lossReason)
      .catch(err => this.handleError(err));
  }

  getLossReasonDailyCountByLossReason(startDate: string, endDate: string, lossReason: string): Observable<any> {
    return this.http.get(this.apiUrl + 'lossReasonDailyCountByLossReason?startDate=' + startDate + '&endDate=' + endDate + '&lossReason=' + lossReason)
      .catch(err => this.handleError(err));
  }

  getMonthlyRevenue(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlyRevenue?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getMonthlyEbitda(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlyEbitda?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getMonthlyGrossProfit(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlyGrossProfit?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getMonthlyNetProfit(startDate: string, endDate: string): Observable<any> {
    return this.http.get(this.apiUrl + 'monthlyNetProfit?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getManpowerSummary(startDate, endDate, ): Observable<any> {
    return this.http.get(this.apiUrl + 'manpowerSummary?startDate=' + startDate + '&endDate=' + endDate)
      .catch(err => this.handleError(err));
  }

  getManpowerSummaryBySection(startDate, endDate, section, ): Observable<any> {
    return this.http.get(this.apiUrl + 'manpowerSummaryBySection?&startDate=' + startDate + '&endDate=' + endDate + '&section=' + section)
      .catch(err => this.handleError(err));
  }

  getResourceUtilizationDistinctEmployeeBySectionAndStartTimeBetween(startDate, endDate, section ): Observable<any> {
    return this.http.get(this.apiUrl + 'resourceUtilizationDistinctEmployeeBySectionAndStartTimeBetween?section=' + section+'&startDate=' + startDate + '&endDate=' + endDate )
      .catch(err => this.handleError(err));
  }

  getResourceUtilizationDistinctEmployeeByControlPointAndStartTimeBetween(controlPoint, startDate, endDate ): Observable<any> {
    return this.http.get(this.apiUrl + 'resourceUtilizationDistinctEmployeeByControlPointAndStartTimeBetween?controlPoint=' + controlPoint+'&startDate=' + startDate + '&endDate=' + endDate )
      .catch(err => this.handleError(err));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    alert(JSON.parse(error._body).message);
    return Promise.reject(error.message || error);
  }


}
