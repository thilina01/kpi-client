import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig, APP_CONFIG } from '../app.config';
import { AuthService } from './auth.service';
import { MasterService } from './master.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddressService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('addresses/');
  }

  getComboByCustomer(id: number): Observable<any> {
    return this.http.get(this.apiUrl + 'comboByCustomer/' + id, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

}
