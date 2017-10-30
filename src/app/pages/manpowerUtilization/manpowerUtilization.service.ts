import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ManpowerUtilizationService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('manpowerUtilizations/');
  }

  getByJobPage(job, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'jobPage?job=' + job + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }

  getSummaryByJob(job, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'summaryByJob?jobId=' + job)
      .catch(err => this.handleError(err));
  }

  getByProductionDurationPage(startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'productionDurationPage?startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }

  getByProductionDurationAndShiftPage(startDate, endDate, shift, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'productionDurationAndShiftPage?startDate=' + startDate + '&endDate=' + endDate + '&shift=' + shift + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getBySectionAndProductionDurationPage(section, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'sectionAndProductionDurationPage?section=' + section + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getByProductionDurationAndEmployeePage(employee, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'productionDurationAndEmployeePage?employee=' + employee + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getBySectionAndEmployeeAndProductionDurationAndShiftPage(section, startDate, employee, endDate, shift, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'sectionAndEmployeeAndProductionDurationAndShiftPage?section=' + section + '&startDate=' + startDate + '&employee=' + employee + '&endDate=' + endDate + '&shift=' + shift + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
}
