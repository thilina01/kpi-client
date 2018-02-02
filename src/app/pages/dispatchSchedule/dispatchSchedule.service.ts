import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DispatchScheduleService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('dispatchSchedules/');
  }

  getOneByDispatchScheduleNo(dispatchScheduleNo: any): Observable<any> {
    return this.http.get(this.apiUrl + 'dispatchScheduleNo/' + dispatchScheduleNo, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getBySalesOrder(salesOrder: any): Observable<any> {
    return this.http.get(this.apiUrl + 'salesOrder/' + salesOrder, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getComboByCustomer(id: number): Observable<any> {
    return this.http.get(this.apiUrl + 'comboByCustomer/' + id, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getByDispatchScheduleDurationPage(startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'dispatchScheduleDurationPage?startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getByDispatchScheduleDurationAndJobPage(startDate, endDate, job, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'dispatchScheduleDurationAndJobPage?startDate=' + startDate + '&endDate=' + endDate + '&job=' + job + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getByCustomerAndDispatchScheduleDurationPage(customer, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'customerAndDispatchScheduleDurationPage?customer=' + customer + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getByCustomerAndDispatchScheduleDurationAndJobPage(customer, startDate, endDate, job, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'customerAndDispatchScheduleDurationAndJobPage?customer=' + customer + '&startDate=' + startDate + '&endDate=' + endDate + '&job=' + job + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getPageByCustomer(customer: any, page, size): Observable<any> {
    return this.http.post(this.apiUrl + 'pageByCustomer?page=' + page + '&size=' + size, JSON.stringify(customer), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getPageByJob(job: any, page, size): Observable<any> {
    return this.http.post(this.apiUrl + 'pageByJob?page=' + page + '&size=' + size, JSON.stringify(job), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

}
