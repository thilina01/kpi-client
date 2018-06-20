import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomerItemService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('customerItems/');
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

  getcustomerItem(customer,  item,code, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'customerItem?customer=' + customer+ '&item=' + item +'&code=' + code + '&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }

  getByCustomer(id: number): Observable<any> {
    return this.http.get(this.apiUrl + 'customer/' + id, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
}
