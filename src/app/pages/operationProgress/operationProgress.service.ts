import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OperationProgressService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('operationProgresses/');
  }

  getPageBySection(section: any, page, size): Observable<any> {
    return this.http.post(this.apiUrl + 'pageBySection?page=' + page + '&size=' + size, JSON.stringify(section), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getPageByJob(job: any, page, size): Observable<any> {
    return this.http.post(this.apiUrl + 'pageByJob?page=' + page + '&size=' + size, JSON.stringify(job), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getPageByControlPoint(controlPoint: any, page, size): Observable<any> {
    return this.http.post(this.apiUrl + 'pageByControlPoint?page=' + page + '&size=' + size, JSON.stringify(controlPoint), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getControlPointAndSectionAndJobAndProductionDateBetweenPage(section,job, startDate, endDate, controlPoint, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'controlPointAndSectionAndJobAndProductionDateBetween?section=' + section + '&job=' + job + '&startDate=' + startDate + '&endDate=' + endDate + '&controlPoint=' + controlPoint + '&page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
}
