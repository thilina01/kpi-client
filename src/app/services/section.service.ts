import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { APP_CONFIG, IAppConfig } from '../app.config';

@Injectable()
export class SectionService {

  private headers: Headers; // = new Headers({ 'Content-Type': 'application/json' });
  private apiUrl: string;  // URL to web api

  constructor(private http: Http, @Inject(APP_CONFIG) private config: IAppConfig) {
    this.apiUrl = config.apiEndpoint + 'sections/';
    this.headers = new Headers(config.jsonHeaders);
  }

  getAll(): Promise<Array<Object>> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response.json() as Array<Object>)
      .catch(this.handleError);
  }

  getOne(id: number): Promise<Object> {
    return this.http.get(this.apiUrl + id)
      .toPromise()
      .then(response => response.json() as Object)
      .catch(this.handleError);
  }

  save(object: Object): Promise<Object> {

    return this.http
      .post(this.apiUrl, JSON.stringify(object), { headers: this.config.getJsonHeaders() })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: number): Promise<Object> {

    return this.http
      .delete(this.apiUrl + id, { headers: this.config.getJsonHeaders() })
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
