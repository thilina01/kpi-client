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
  getByProductionDurationPage(startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'productionDurationPage?startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getByProductionDurationAndControlPointPage(startDate, endDate, controlPoint, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'productionDurationAndControlPointPage?startDate=' + startDate + '&endDate=' + endDate + '&controlPoint=' + controlPoint + '&page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getBySectionAndProductionDurationPage(section, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'sectionAndProductionDurationPage?section=' + section + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getByProductionDurationAndJobPage(job, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'productionDurationAndJobPage?job=' + job + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getBySectionAndJobAndProductionDurationAndControlPointPage(section, job, startDate, endDate, controlPoint, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'sectionAndJobAndProductionDurationAndControlPointPage?section=' + section + '&job=' + job + '&startDate=' + startDate + '&endDate=' + endDate + '&controlPoint=' + controlPoint + '&page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
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

  getByControlPointAndProductionDurationAndJobPage(controlPoint, startDate, endDate, job, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'controlPointAndProductionDurationAndJobPage?controlPoint=' + controlPoint + '&startDate=' + startDate + '&endDate=' + endDate + '&job=' + job + '&page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getBySectionAndProductionDurationAndJobPage(section, startDate, endDate, job, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'sectionAndProductionDurationAndJobPage?section=' + section + '&startDate=' + startDate + '&endDate=' + endDate + '&job=' + job + '&page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getBySectionAndProductionDurationAndControlPointPage(section, startDate, endDate, controlPoint, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'sectionAndProductionDurationAndControlPointPage?section=' + section + '&startDate=' + startDate + '&endDate=' + endDate + '&controlPoint=' + controlPoint + '&page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
}
