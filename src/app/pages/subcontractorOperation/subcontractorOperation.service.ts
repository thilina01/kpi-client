import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class SubcontractorOperationService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('subcontractorOperations/');
  }

  getSubcontractorOperation(subcontractor, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'subcontractorOperation?&subcontractor=' + subcontractor + '&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }

  getBySubcontractor(id: number): Observable<any> {
    return this.http.get(this.apiUrl + 'subcontractor/' + id, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
}
