import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig, APP_CONFIG } from '../app.config';
import { AuthService } from './auth.service';
import { MasterService } from './master.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoadingPlanItemService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('loadingPlanItems/');
  }

  getInvoiceInformationPage(invoice, invoiceNumber, customer, job, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'invoiceInformation?invoice=' + invoice +'&invoiceNumber=' + invoiceNumber +'&customer=' + customer+ '&job=' + job+'&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }

  getDispatchInformationPage(customer, item, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'dispatchInformation?customer=' + customer+  '&item=' + item + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
}
