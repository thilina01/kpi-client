import { Injectable, Inject } from '@angular/core';
import { MasterService } from "../../services/master.service";
import { HttpClient } from "@angular/common/http";
import { APP_CONFIG, IAppConfig } from "../../app.config";
import { AuthService } from "../../services/auth.service";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccidentService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('accidents/');
  }
  getByAccidentDurationPage(startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'accidentDurationPage?startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getBySectionAndAccidentDurationPage(section, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'sectionAndAccidentDurationPage?section=' + section + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getByEmployeeAndAccidentDurationPage(employee, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'employeeAndAccidentDurationPage?employee=' + employee + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getPageByEmployee(employee: any, page, size): Observable<any> {
    return this.http.post(this.apiUrl + 'pageByEmployee?page=' + page + '&size=' + size, JSON.stringify(employee), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
}
