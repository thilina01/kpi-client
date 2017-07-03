import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { APP_CONFIG, IAppConfig } from '../app.config';

@Injectable()
export class OperationTypeService {

  private headers: Object; //= new Headers({ 'Content-Type': 'application/json' });
  private apiUrl: string;  // URL to web api

  constructor(private http: Http, @Inject(APP_CONFIG) private config: IAppConfig) {
    this.apiUrl = config.apiEndpoint + 'operationTypes/';
    this.headers = config.jsonHeaders;
  }

  getAll(): Promise<Array<Object>> {
    return this.http.get(this.apiUrl, { headers: this.config.getJsonHeaders() })
      .toPromise()
      .then(response => response.json() as Array<Object>)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    alert(JSON.parse(error._body).message);
    return Promise.reject(error.message || error);
  }
}
