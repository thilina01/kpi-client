import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig, APP_CONFIG } from '../app.config';
import { AuthService } from './auth.service';
import { MasterService } from './master.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SubcontractReworkNoteService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('subcontractReworkNotes/');
  }
  saveSubcontractReworkNoteRelease(object: Object): Observable<any> {
    return this.http
      .post(this.apiUrl + 'releaseInformation', JSON.stringify(object), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getSubcontractReworkNote(subcontractor,  startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'subcontractReworkNote?subcontractor=' + subcontractor + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }
  getSubcontractReworkRelease(location, subcontractor,  startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'subcontractReworkNoteRelease?location=' + location +'&subcontractor=' + subcontractor+ '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }
}
