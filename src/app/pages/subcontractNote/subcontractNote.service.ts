import { Injectable, Inject } from "@angular/core";
import { MasterService } from "../../services/master.service";
import { HttpClient } from "@angular/common/http";
import { APP_CONFIG, IAppConfig } from "../../app.config";
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class SubcontractNoteService extends MasterService {
  getInvoiceInformationPage(arg0: any, arg1: any, arg2: any, arg3: any, arg4: any, arg5: any, arg6: any, arg7: any): any {
    throw new Error("Method not implemented.");
  }
  constructor(
    private anHttp: HttpClient,
    @Inject(APP_CONFIG) private aConfig: IAppConfig,
    private anAuthService: AuthService
  ) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl("subcontractNotes/");
  }

  getOne(id: any): Observable<any> {
    return this.http.get(this.apiUrl + id, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getSubcontractNote(subcontractor,  startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'subcontractNote?subcontractor=' + subcontractor + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }

  getSubcontractRelease(location, subcontractor,  startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'subcontractRelease?location=' + location +'&subcontractor=' + subcontractor+ '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }

  saveRelease(object: Object): Observable<any> {
    return this.http
      .post(this.apiUrl + 'release', JSON.stringify(object), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
}
