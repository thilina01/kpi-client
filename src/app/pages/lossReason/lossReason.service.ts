import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LossReasonService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('lossReasons/');
  }
  getComboByLossType(lossType: any): Observable<any> {
    return this.http
      .post(this.apiUrl + 'comboByLossType', JSON.stringify(lossType), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getPageByLossType(lossType: any, page, size): Observable<any> {
    return this.http.post(this.apiUrl + 'pageByLossType?page=' + page + '&size=' + size, JSON.stringify(lossType), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

}

