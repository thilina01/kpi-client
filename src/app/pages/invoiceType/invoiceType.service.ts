import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InvoiceTypeService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('invoiceTypes/');
  }
  getComboByCustomer(customer: any): Observable<any> {
    return this.http
      .post(this.apiUrl +'comboByCustomer', JSON.stringify(customer), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getPageByCustomer(customer: any, page, size): Observable<any> {
    return this.http.post(this.apiUrl + 'pageByCustomer?page=' + page + '&size=' + size, JSON.stringify(customer), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getcustomerAndItem(customer,  item, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'invoiceType?customer=' + customer+ '&item=' + item + '&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }
}
