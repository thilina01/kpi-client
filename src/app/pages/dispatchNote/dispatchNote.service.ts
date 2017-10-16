import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DispatchNoteService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('dispatchNotes/');
  }

  saveRelease(object: Object): Observable<any> {
    return this.http
      .post(this.apiUrl + 'release', JSON.stringify(object), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
}
