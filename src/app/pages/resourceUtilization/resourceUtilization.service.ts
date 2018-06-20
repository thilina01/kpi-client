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
    return this.http.get(this.apiUrl + 'productionDurationPage?startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }

  getByProductionDurationAndShiftPage(startDate, endDate, shift, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'productionDurationAndShiftPage?startDate=' + startDate + '&endDate=' + endDate + '&shift=' + shift + '&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }

  getByMachineAndProductionDurationPage(machine, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'machineAndProductionDurationPage?machine=' + machine + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }

  getByProductionDurationAndEmployeePage(employee, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'productionDurationAndEmployeePage?employee=' + employee + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }

  getByMachineAndEmployeeAndProductionDurationAndShiftPage(machine, employee, startDate, endDate, shift, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'machineAndEmployeeAndProductionDurationAndShiftPage?machine=' + machine + '&employee=' + employee + '&startDate=' + startDate + '&endDate=' + endDate + '&shift=' + shift + '&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }

  getByMachineAndProductionDurationAndShiftPage(machine, startDate, endDate, shift, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'machineAndProductionDurationAndShiftPage?machine=' + machine + '&startDate=' + startDate + '&endDate=' + endDate + '&shift=' + shift + '&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }

  getByMachineAndProductionDurationAndEmployeePage(machine, startDate, endDate, employee, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'machineAndProductionDurationAndEmployeePage?machine=' + machine + '&startDate=' + startDate + '&endDate=' + endDate + '&employee=' + employee + '&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }
  
  getByEmployeeAndProductionDurationAndShiftPage(employee, startDate, endDate, shift, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'employeeAndProductionDurationAndShiftPage?employee=' + employee + '&startDate=' + startDate + '&endDate=' + endDate + '&shift=' + shift + '&page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }
}



