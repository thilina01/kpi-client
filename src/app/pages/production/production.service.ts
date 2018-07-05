import { Injectable, Inject } from '@angular/core';
import { MasterService } from "../../services/master.service";
import { HttpClient } from "@angular/common/http";
import { APP_CONFIG, IAppConfig } from "../../app.config";
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ProductionService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('productions/');
  }

  findByProductionDateAndShiftAndControlPoint(object: Object): Observable<any> {
    return this.http
      .post(this.apiUrl + "ByProductionDateAndShiftAndControlPoint", JSON.stringify(object), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getControlPointTypeAndSectionAndShiftAndProductionDateBetweenPage(section, shift, startDate, endDate, controlPointType, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'controlPointTypeAndSectionAndShiftAndProductionDateBetween?section=' + section + '&shift=' + shift + '&startDate=' + startDate + '&endDate=' + endDate + '&controlPointType=' + controlPointType + '&page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

}
