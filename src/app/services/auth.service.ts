import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import 'rxjs/add/operator/toPromise';

import { APP_CONFIG, IAppConfig } from '../app.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
  isLoggedIn(): boolean {
    return Cookie.get("email") != undefined;
  }
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  private headers: Headers;
  private apiUrl: string;  // URL to web api

  constructor(private http: Http, @Inject(APP_CONFIG) private config: IAppConfig) {
    this.headers = new Headers(config.jsonHeaders);
    this.apiUrl = config.apiEndpoint + 'accounts/';
  }

  loginx(values: any): Observable<boolean> {
    return this.http
      .post(this.apiUrl + 'login', JSON.stringify(values), { headers: this.config.getJsonHeaders() })
      .map(response => {
        if (response.text() === 'true') {
          Cookie.set('email', values.email)
          return true;
        }
        return false;
      })
      .catch(this.handleError);
  }

  login(values: any): Promise<boolean> {
    let result: boolean = false;
    return this.http
      .post(this.apiUrl + 'login', JSON.stringify(values), { headers: this.config.getJsonHeaders() })
      .toPromise()
      .then(response => {
        let text = response.text();
        if (text === 'true') {
          Cookie.set('email', values.email)
          this.config.setJsonHeaders();
          return true;
        }
        return false;
      })
      .catch(this.handleError);
  }

  logout() {
    let email = Cookie.get('email')
    if (email == undefined) return;
    this.http
      .post(this.apiUrl + 'logout', { email: email }, { headers: this.config.getJsonHeaders() })
      .toPromise()
      .then(response => {
        Cookie.delete('email');
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    alert(JSON.parse(error._body).message);
    return Promise.reject(error.message || error);
  }
}
