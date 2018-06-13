import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class SalesOrderService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('salesOrders/');
  }
  getPageByCustomer(customer: any, page, size): Observable<any> {
    return this.http.post(this.apiUrl + 'pageByCustomer?page=' + page + '&size=' + size, JSON.stringify(customer), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getComboByCustomer(id: number): Observable<any> {
    return this.http.get(this.apiUrl + 'comboByCustomer/' + id, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getSalesOrderPage(customer, salesOrderType, customerPoNumber, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'salesOrder?customer=' + customer+ '&salesOrderType=' + salesOrderType +'&customerPoNumber=' + customerPoNumber + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  // getByCustomerPoNumber(customerPoNumber: any): Observable<any> {
  //   return this.http.get(this.apiUrl + 'customerPoNumber/' + customerPoNumber, { headers: this.getJsonHeaders() })
  //     .catch(err => this.handleError(err));
  // }
}

