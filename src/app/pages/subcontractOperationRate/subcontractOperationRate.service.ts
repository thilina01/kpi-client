import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SubcontractOperationRateService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('subcontractOperationRates/');
  }

  getSubcontractOperationRatePage(subcontractor, subcontractOperationDefinition, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'subcontractOperationRate?subcontractor=' + subcontractor +'&subcontractOperationDefinition=' + subcontractOperationDefinition+ '&page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getBySubcontractor(id: number): Observable<any> {
    return this.http.get(this.apiUrl + 'subcontractor/' + id, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getLatestBySubcontractorOperation(subcontractorOperationId): Observable<any> {
    return this.http.get(this.apiUrl + 'latestBysubcontractorOperationId?subcontractorOperationId=' + subcontractorOperationId, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
}
