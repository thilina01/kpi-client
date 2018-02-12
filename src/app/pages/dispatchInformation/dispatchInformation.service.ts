import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DispatchInformationService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('dispatches/');
  }
  getByDispatchDurationPage(startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'dispatchDurationPage?startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getByDispatchDurationAndItemPage(startDate, endDate, item, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'dispatchDurationAndItemPage?startDate=' + startDate + '&endDate=' + endDate + '&item=' + item + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getByCustomerAndDispatchDurationPage(customer, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'customerAndDispatchDurationPage?customer=' + customer + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getByCustomerAndDispatchDurationAndItemPage(customer, startDate, endDate, item, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'customerAndDispatchDurationAndItemPage?customer=' + customer + '&startDate=' + startDate + '&endDate=' + endDate + '&item=' + item + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getPageByCustomer(customer: any, page, size): Observable<any> {
    return this.http.post(this.apiUrl + 'pageByCustomer?page=' + page + '&size=' + size, JSON.stringify(customer), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getPageByItem(item: any, page, size): Observable<any> {
    return this.http.post(this.apiUrl + 'pageByItem?page=' + page + '&size=' + size, JSON.stringify(item), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
}
