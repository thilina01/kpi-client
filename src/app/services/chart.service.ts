import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';

import { APP_CONFIG, IAppConfig } from '../app.config';
import { AuthService } from "./auth.service";

@Injectable()
export class ChartService {

    private headers: Headers; // = new Headers({ 'Content-Type': 'application/json' });
    private apiUrl: string;  // URL to web api

    selectionChange: Subject<any> = new Subject<any>();

    constructor(private http: Http, @Inject(APP_CONFIG) private config: IAppConfig, private authService: AuthService) {
        this.apiUrl = config.apiEndpoint + 'chart/';
        //this.headers = new Headers(config.jsonHeaders);
    }
    
    getBreakdown(startDate: string, endDate: string): Promise<Array<Object>> {

        return this.http.get(this.apiUrl + 'breakdown?startDate=' + startDate + '&endDate=' + endDate)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }

    //chart/scheduleAdherence?startDate=217-01-01&endDate=2017-03-31
    getScheduleAdherence(startDate: string, endDate: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'scheduleAdherence?startDate=' + startDate + '&endDate=' + endDate)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }  

    getMonthlySalesWeight(startDate: string, endDate: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'monthlySalesWeight?startDate=' + startDate + '&endDate=' + endDate)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }  
        
    getMonthlySalesValue(startDate: string, endDate: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'monthlySalesValue?startDate=' + startDate + '&endDate=' + endDate)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }  

    getMonthlyConsumableCostPerKgChart(startDate: string, endDate: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'monthlyConsumableCostPerKg?startDate=' + startDate + '&endDate=' + endDate)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }  

    getMonthlyCumulativeSalesPerKg(startDate: string, endDate: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'monthlyCumulativeSalesPerKg?startDate=' + startDate + '&endDate=' + endDate)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }  

    getMonthlyElectricityCostPerKg(startDate: string, endDate: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'monthlyElectricityCostPerKg?startDate=' + startDate + '&endDate=' + endDate)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }  

    getMonthlyLabourCostPerKg(startDate: string, endDate: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'monthlyLabourCostPerKg?startDate=' + startDate + '&endDate=' + endDate)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }  

    getMonthlyMaterialCostPerKg(startDate: string, endDate: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'monthlyMaterialCostPerKg?startDate=' + startDate + '&endDate=' + endDate)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }  

    getMonthlyProductionOverheadCostPerKg(startDate: string, endDate: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'monthlyProductionOverheadCostPerKg?startDate=' + startDate + '&endDate=' + endDate)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }  

    getMonthlySalesPerKg(startDate: string, endDate: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'monthlySalesPerKg?startDate=' + startDate + '&endDate=' + endDate)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }  

    getMonthlyScheduleAdherence(startDate: string, endDate: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'monthlyScheduleAdherence?startDate=' + startDate + '&endDate=' + endDate)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }  

    getMonthlyLabourTurnover(startDate: string, endDate: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'monthlyLabourTurnover?startDate=' + startDate + '&endDate=' + endDate)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }  

    getMonthlyAbsenteeism(startDate: string, endDate: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'monthlyAbsenteeism?startDate=' + startDate + '&endDate=' + endDate)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }  
    
    getMonthlyEnergyConsumptionByLocation(startDate: string, endDate: string, location: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'monthlyEnergyConsumptionByLocation?startDate=' + startDate + '&endDate=' + endDate+ '&location=' + location)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }  
    
    getScheduleAdherenceBySection(startDate: string, endDate: string, section: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'scheduleAdherenceBySection?startDate=' + startDate + '&endDate=' + endDate + '&section=' + section)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }

    getScheduleAdherenceBySectionAndLossType(startDate: string, endDate: string, section: string, lossTypeId: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'scheduleAdherenceBySectionAndLossType?startDate=' + startDate + '&endDate=' + endDate + '&section=' + section + '&lossType=' + lossTypeId)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }

    getLossReasonSummaryBySection(startDate: string, endDate: string, section: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'lossReasonSummaryBySection?startDate=' + startDate + '&endDate=' + endDate + '&section=' + section)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }

    getLossReasonSummaryBySectionAndLossType(startDate: string, endDate: string, section: string, lossTypeId: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'lossReasonSummaryBySectionAndLossType?startDate=' + startDate + '&endDate=' + endDate + '&section=' + section + '&lossType=' + lossTypeId)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }

    getLossReasonSummary(startDate: string, endDate: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'lossReasonSummary?startDate=' + startDate + '&endDate=' + endDate)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }

    getLossReasonSummaryByLossType(startDate: string, endDate: string, lossTypeId: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'lossReasonSummaryByLossType?startDate=' + startDate + '&endDate=' + endDate + '&lossType=' + lossTypeId)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }

    getLossReasonDailyCountBySection(startDate: string, endDate: string, section: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'lossReasonDailyCountBySection?startDate=' + startDate + '&endDate=' + endDate + '&section=' + section)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }

    getLossReasonDailyCountBySectionAndLossType(startDate: string, endDate: string, section: string, lossTypeId: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'lossReasonDailyCountBySectionAndLossType?startDate=' + startDate + '&endDate=' + endDate + '&section=' + section + '&lossType=' + lossTypeId)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }

    getLossReasonDailyCount(startDate: string, endDate: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'lossReasonDailyCount?startDate=' + startDate + '&endDate=' + endDate)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }

    getLossReasonDailyCountByLossType(startDate: string, endDate: string, lossTypeId: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'lossReasonDailyCountByLossType?startDate=' + startDate + '&endDate=' + endDate + '&lossType=' + lossTypeId)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }

    getLossReasonDailyCountBySectionAndLossReason(startDate: string, endDate: string, section: string, lossReason: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'lossReasonDailyCountBySectionAndLossReason?startDate=' + startDate + '&endDate=' + endDate + '&section=' + section + '&lossReason=' + lossReason)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }

    getLossReasonDailyCountByLossReason(startDate: string, endDate: string, lossReason: string): Promise<Array<Object>> {
        return this.http.get(this.apiUrl + 'lossReasonDailyCountByLossReason?startDate=' + startDate + '&endDate=' + endDate + '&lossReason=' + lossReason)
            .toPromise()
            .then(response => response.json() as Array<Object>)
            .catch(this.handleError);
    }

    /*
        private YYYYMMDD(date: Date): string {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
    
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
    
            return [year, month, day].join('-');
        }
    */
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
    alert(JSON.parse(error._body).message);
        return Promise.reject(error.message || error);
    }


}
