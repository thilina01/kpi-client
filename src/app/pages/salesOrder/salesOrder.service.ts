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
  getBySalesOrderDurationPage(startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'salesOrderDurationPage?startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getBySalesOrderDurationAndSalesOrderTypePage(startDate, endDate, salesOrderType, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'salesOrderDurationAndSalesOrderTypePage?startDate=' + startDate + '&endDate=' + endDate + '&salesOrderType=' + salesOrderType + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getByCustomerAndSalesOrderDurationPage(customer, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'customerAndSalesOrderDurationPage?customer=' + customer + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getByCustomerAndSalesOrderDurationAndSalesOrderTypePage(customer, startDate, endDate, salesOrderType, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'customerAndSalesOrderDurationAndSalesOrderTypePage?customer=' + customer + '&startDate=' + startDate + '&endDate=' + endDate + '&salesOrderType=' + salesOrderType + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
}
