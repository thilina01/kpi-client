import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OperationService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('operations/');
  }

  getByJobPage(job, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'jobPage?job=' + job + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }

  getSummaryByJob(job, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'summaryByJob?jobId=' + job)
      .catch(err => this.handleError(err));
  }

  getByProductionDurationPage(startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'productionDurationPage?startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }

  getByProductionDurationAndShiftPage(startDate, endDate, shift, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'productionDurationAndShiftPage?startDate=' + startDate + '&endDate=' + endDate + '&shift=' + shift + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
  getBySectionAndProductionDurationPage(section, startDate, endDate, page, size):  Observable<any> {
    return this.http.get(this.apiUrl + 'sectionAndProductionDurationPage?section=' + section + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
      getBySectionAndProductionDurationAndShiftPage(section, startDate, endDate, shift, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'sectionAndProductionDurationAndShiftPage?section=' + section + '&startDate=' + startDate + '&endDate=' + endDate + '&shift=' + shift + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }
}
// import { Injectable, Inject } from '@angular/core';
// import { Headers, Http } from '@angular/http';
// import 'rxjs/add/operator/toPromise';

// import { APP_CONFIG, IAppConfig } from '../../app.config';
// import { AuthService } from '../../services/auth.service';


// @Injectable()
// export class OperationService {

//   private headers: Headers; // = new Headers({ 'Content-Type': 'application/json' });
//   private apiUrl: string;  // URL to web api
//   private getJsonHeaders(): Headers{
//     return new Headers({
//       'Content-Type': 'application/json',
//       'email': this.authService.email
//     });
//   }; 
//   constructor(private http: Http, @Inject(APP_CONFIG) private config: IAppConfig, private authService: AuthService) {
//     this.apiUrl = config.apiEndpoint + 'operations/';
//     //this.headers = new Headers(config.jsonHeaders);
//   }

//   getAll(): Promise<Array<Object>> {
//     return this.http.get(this.apiUrl, { headers: this.getJsonHeaders() })
//       .toPromise()
//       .then(response => response.json() as Array<Object>)
//       .catch(this.handleError);
//   }

//   getPage(page, size): Promise<Array<Object>> {
//     return this.http.get(this.apiUrl + 'page?page=' + page + '&size=' + size)
//       .toPromise()
//       .then(response => response.json() as Array<Object>)
//       .catch(this.handleError);
//   }

//   getByJobPage(job, page, size): Promise<Array<Object>> {
//     return this.http.get(this.apiUrl + 'jobPage?job=' + job + '&page=' + page + '&size=' + size)
//       .toPromise()
//       .then(response => response.json() as Array<Object>)
//       .catch(this.handleError);
//   }

//   getSummaryByJob(job, page, size): Promise<Array<Object>> {
//     return this.http.get(this.apiUrl + 'summaryByJob?jobId=' + job)
//       .toPromise()
//       .then(response => response.json() as Array<Object>)
//       .catch(this.handleError);
//   }

//   getByProductionDateAndShiftPage(productionDate, shift, page, size): Promise<Array<Object>> {
//     return this.http.get(this.apiUrl + 'productionDateAndShiftPage?productionDate=' + productionDate + '&shift=' + shift + '&page=' + page + '&size=' + size)
//       .toPromise()
//       .then(response => response.json() as Array<Object>)
//       .catch(this.handleError);
//   }
//   getByProductionDurationPage(startDate, endDate, page, size): Promise<Array<Object>> {
//     return this.http.get(this.apiUrl + 'productionDurationPage?startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
//       .toPromise()
//       .then(response => response.json() as Array<Object>)
//       .catch(this.handleError);
//   }
//   getByProductionDurationAndShiftPage(startDate, endDate, shift, page, size): Promise<Array<Object>> {
//     return this.http.get(this.apiUrl + 'productionDurationAndShiftPage?startDate=' + startDate + '&endDate=' + endDate + '&shift=' + shift + '&page=' + page + '&size=' + size)
//       .toPromise()
//       .then(response => response.json() as Array<Object>)
//       .catch(this.handleError);
//   }

//   getBySectionAndProductionDateAndShiftPage(section, productionDate, shift, page, size): Promise<Array<Object>> {
//     return this.http.get(this.apiUrl + 'sectionAndProductionDateAndShiftPage?section=' + section + '&productionDate=' + productionDate + '&shift=' + shift + '&page=' + page + '&size=' + size)
//       .toPromise()
//       .then(response => response.json() as Array<Object>)
//       .catch(this.handleError);
//   }
//   getBySectionAndProductionDurationAndShiftPage(section, startDate, endDate, shift, page, size): Promise<Array<Object>> {
//     return this.http.get(this.apiUrl + 'sectionAndProductionDurationAndShiftPage?section=' + section + '&startDate=' + startDate + '&endDate=' + endDate + '&shift=' + shift + '&page=' + page + '&size=' + size)
//       .toPromise()
//       .then(response => response.json() as Array<Object>)
//       .catch(this.handleError);
//   }

//   getBySectionAndProductionDurationPage(section, startDate, endDate, page, size): Promise<Array<Object>> {
//     return this.http.get(this.apiUrl + 'sectionAndProductionDurationPage?section=' + section + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size)
//       .toPromise()
//       .then(response => response.json() as Array<Object>)
//       .catch(this.handleError);
//   }

//   getOne(id: number): Promise<Object> {
//     return this.http.get(this.apiUrl + id, { headers: this.getJsonHeaders() })
//       .toPromise()
//       .then(response => response.json() as Object)
//       .catch(this.handleError);
//   }

//   save(object: Object): Promise<Object> {
//     return this.http
//       .post(this.apiUrl, JSON.stringify(object), { headers: this.getJsonHeaders() })
//       .toPromise()
//       .then(res => res.json().data)
//       .catch(this.handleError);
//   }

//   delete(id: number): Promise<Object> {
//     return this.http
//       .delete(this.apiUrl + id, { headers: this.getJsonHeaders() })
//       .toPromise()
//       .catch(this.handleError);
//   }

//   private handleError(error: any): Promise<any> {
//     console.error('An error occurred', error); // for demo purposes only
//     alert(JSON.parse(error._body).message);
//     return Promise.reject(error.message || error);
//   }
// }
