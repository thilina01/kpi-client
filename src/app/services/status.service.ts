import { Injectable, Inject } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { APP_CONFIG, IAppConfig } from '../app.config';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class StatusService {

  private headers: Headers; // = new Headers({ 'Content-Type': 'application/json' });
  private apiUrl: string;  // URL to web api
  private getJsonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'email': this.authService.email
    });
  };
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: IAppConfig, private authService: AuthService) {
    this.apiUrl = config.apiEndpoint + 'statuses/';
  }

  getAll(): Promise<Array<Object>> {
    return this.http.get(this.apiUrl, { headers: this.getJsonHeaders() })
      .toPromise()
      .then(response => response as Array<Object>)
      .catch(this.handleError);
  }

  getPage(page, size): Promise<Array<Object>> {
    return this.http.get(this.apiUrl + 'page?page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .toPromise()
      .then(response => response as Array<Object>)
      .catch(this.handleError);
  }

  getOne(id: number): Promise<Object> {
    return this.http.get(this.apiUrl + id, { headers: this.getJsonHeaders() })
      .toPromise()
      .then(response => response as Object)
      .catch(this.handleError);
  }
  getOneByJobNo(jobNo: any): Promise<Object> {
    return this.http.get(this.apiUrl + 'jobNo/' + jobNo, { headers: this.getJsonHeaders() })
      .toPromise()
      .then(response => response as Object)
      .catch(this.handleError);
  }

  save(object: Object): Promise<Object> {

    return this.http
      .post(this.apiUrl, JSON.stringify(object), { headers: this.getJsonHeaders() })
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  delete(id: number): Promise<Object> {

    return this.http
      .delete(this.apiUrl + id, { headers: this.getJsonHeaders() })
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    alert(JSON.parse(error._body).message);
    return Promise.reject(error.message || error);
  }
}
