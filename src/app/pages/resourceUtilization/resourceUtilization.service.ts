import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResourceUtilizationService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('resourceUtilizations/');
  }

  getByProductionDurationPage(startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'productionDurationPage?startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getByProductionDurationAndShiftPage(startDate, endDate, shift, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'productionDurationAndShiftPage?startDate=' + startDate + '&endDate=' + endDate + '&shift=' + shift + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getByMachineAndProductionDurationPage(machine, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'machineAndProductionDurationPage?machine=' + machine + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getByProductionDurationAndEmployeePage(employee, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'productionDurationAndEmployeePage?employee=' + employee + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getByMachineAndEmployeeAndProductionDurationAndShiftPage(machine, startDate, employee, endDate, shift, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'machineAndEmployeeAndProductionDurationAndShiftPage?machine=' + machine + '&startDate=' + startDate + '&employee=' + employee + '&endDate=' + endDate + '&shift=' + shift + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
}



