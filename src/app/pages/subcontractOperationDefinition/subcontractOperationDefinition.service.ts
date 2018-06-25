import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SubcontractOperationDefinitionService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('subcontractOperationDefinitions/');
  }

  getBySubcontractOperationDefinition(item, productType, operationType, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'getsubcontractOperationDefinition?&item=' + item +'&productType=' + productType+'&operationType=' + operationType+'&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }
}
