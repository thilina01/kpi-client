import {Injectable, Inject} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {IAppConfig, APP_CONFIG} from '../app.config';
import {AuthService} from './auth.service';

export class MasterService {
  public getJsonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'email': this.authService.email
    });
  };

  private headers: Headers; // = new Headers({ 'Content-Type': 'application/json' });
  public apiUrl: string;  // URL to web api
  public endPoint: string;  // URL to web api
  
  constructor(public http: HttpClient,
              private config: IAppConfig,
              private authService: AuthService) {
  }

  setEndPoint(endPoint: string) {
    this.endPoint = endPoint;
    this.setApiUrl(endPoint+'/')
  }

  setApiUrl(path: string) {
    this.apiUrl = this.config.apiEndpoint + path;
  }

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }

  getPage(page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'page?page=' + page + '&size=' + size, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }

  getCombo(): Observable<any> {
    return this.http.get(this.apiUrl + 'combo', {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }

  get(id: number): Observable<any> {
    return this.http.get(this.apiUrl + id, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }

  save(object: Object): Observable<any> {
    return this.http
      .post(this.apiUrl, JSON.stringify(object), {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }

  saveMany(objects: Object[]): Observable<any> {
    return this.http
      .post(this.apiUrl+'many', JSON.stringify(objects), {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }

  delete(id: number): Observable<any> {
    return this.http
      .delete(this.apiUrl + id, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }

  public handleError(httpErrorResponse: any): Observable<any> {
    console.error('An error occurred'); // for demo purposes only
    console.log(httpErrorResponse)
    alert(httpErrorResponse.error.message);
    return Observable.empty<Response>();
  }
}
