import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JobService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('jobs/');
  }

  getOneByJobNo(jobNo: any): Observable<any> {
    return this.http.get(this.apiUrl + 'jobNo/' + jobNo, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getBySalesOrder(salesOrder: any): Observable<any> {
    return this.http.get(this.apiUrl + 'salesOrder/' + salesOrder, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getComboByItem(itemId:Number): Observable<any> {
    return this.http.get(this.apiUrl + 'combo/item/'+itemId, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

}


// import { Injectable, Inject } from '@angular/core';
// import { Headers, Http } from '@angular/http';
// import 'rxjs/add/operator/toPromise';

// import { APP_CONFIG, IAppConfig } from '../../app.config';
// import { AuthService } from '../../services/auth.service';


// @Injectable()
// export class JobService {

//   private headers: Headers; // = new Headers({ 'Content-Type': 'application/json' });
//   private apiUrl: string;  // URL to web api
//   private getJsonHeaders(): Headers{
//     return new Headers({
//       'Content-Type': 'application/json',
//       'email': this.authService.email
//     });
//   }; 
//   constructor(private http: Http, @Inject(APP_CONFIG) private config: IAppConfig, private authService: AuthService) {
//     this.apiUrl = config.apiEndpoint + 'jobs/';
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

//   getOne(id: number): Promise<Object> {
//     return this.http.get(this.apiUrl + id, { headers: this.getJsonHeaders() })
//       .toPromise()
//       .then(response => response.json() as Object)
//       .catch(this.handleError);
//   }
//   getOneByJobNo(jobNo: any): Promise<Object> {
//     return this.http.get(this.apiUrl + 'jobNo/' + jobNo, { headers: this.getJsonHeaders() })
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
