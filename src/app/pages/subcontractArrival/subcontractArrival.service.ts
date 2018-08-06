import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SubcontractArrivalService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('subcontractArrivals/');
  }

  getLatestBySubcontractOperation(subcontractOperationId): Observable<any> {
    return this.http.get(this.apiUrl + 'latestBySubcontractOperationId?subcontractOperationId=' + subcontractOperationId, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getAllBySubcontractOperation(subcontractOperationId): Observable<any> {
    return this.http.get(this.apiUrl + 'allBySubcontractOperationId?subcontractOperationId=' + subcontractOperationId, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
}
