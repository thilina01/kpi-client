import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DispatchNoteService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('dispatchNotes/');
  }

  saveRelease(object: Object): Observable<any> {
    return this.http
      .post(this.apiUrl + 'release', JSON.stringify(object), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getComboByCustomer(id: number): Observable<any> {
    return this.http.get(this.apiUrl + 'comboByCustomer/' + id, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getOneById(id: any): Observable<any> {
    return this.http.get(this.apiUrl + 'id/' + id, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getByDispatchNoteDurationPage(startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'dispatchNoteDurationPage?startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getByDispatchNoteDurationAndLocationPage(startDate, endDate, location, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'dispatchNoteDurationAndLocationPage?startDate=' + startDate + '&endDate=' + endDate + '&location=' + location + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getByCustomerAndDispatchNoteDurationPage(customer, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'customerAndDispatchNoteDurationPage?customer=' + customer + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getByCustomerAndDispatchNoteDurationAndLocationPage(customer, startDate, endDate, location, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'customerAndDispatchNoteDurationAndLocationPage?customer=' + customer + '&startDate=' + startDate + '&endDate=' + endDate + '&location=' + location + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }

}
