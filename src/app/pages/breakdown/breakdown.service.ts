
import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class BreakdownService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('breakdowns/');
  }
  getByBreakdownDurationPage(startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'breakdownDurationPage?startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getByBreakdownDurationAndMachinePage(startDate, endDate, machine, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'breakdownDurationAndMachinePage?startDate=' + startDate + '&endDate=' + endDate + '&machine=' + machine + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getPageByMachine(machine: any, page, size): Observable<any> {
    return this.http.post(this.apiUrl + 'pageByMachine?page=' + page + '&size=' + size, JSON.stringify(machine), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
}
