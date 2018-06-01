import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JobService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('jobs/');
  }

  getOneByJobNo(jobNo: any): Observable<any> {
    return this.http.get(this.apiUrl + 'jobNo/' + jobNo, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getBySalesOrder(salesOrder: any): Observable<any> {
    return this.http.get(this.apiUrl + 'salesOrder/' + salesOrder, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getComboByItem(itemId: Number): Observable<any> {
    return this.http.get(this.apiUrl + 'combo/item/' + itemId, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getPageByItem(item: any, page, size): Observable<any> {
    return this.http.post(this.apiUrl + 'pageByItem?page=' + page + '&size=' + size, JSON.stringify(item), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getItemPage(jobNo, item,  page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'pageByItem?jobNo=' + jobNo + '&item=' + item + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }

}


