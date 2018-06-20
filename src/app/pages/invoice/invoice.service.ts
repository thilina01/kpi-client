import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InvoiceService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('invoices/');
  }
  getByInvoiceDurationPage(startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'invoiceDurationPage?startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }
  getByCustomerAndInvoiceDurationPage(customer, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'customerAndInvoiceDurationPage?customer=' + customer + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }
  getByCustomerDurationPage(customer, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'customerPage?customer=' + customer + '&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }

  getInvoicePage(customer, invoiceNumber, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'invoice?customer=' + customer+ '&invoiceNumber='+ invoiceNumber + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }
}
