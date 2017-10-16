import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { APP_CONFIG, IAppConfig } from '../app.config';
import { AuthService } from './auth.service';

@Injectable()
export class UserMenuService {

  private headers: Headers; // = new Headers({ 'Content-Type': 'application/json' });
  private apiUrl: string;  // URL to web api

  private getJsonHeaders(): Headers {
    return new Headers({
      'Content-Type': 'application/json',
      'email': this.authService.email
    });
  };
  constructor(private http: Http, @Inject(APP_CONFIG) private config: IAppConfig, private authService: AuthService) {
    this.apiUrl = config.apiEndpoint + 'userMenus/';
  }

  getAll(): Promise<Array<Object>> {
    return this.http.get(this.apiUrl, { headers: this.getJsonHeaders() })
      .toPromise()
      .then(response => response.json() as Array<Object>)
      .catch(this.handleError);
  }
  getByUserId(userId: number): Promise<Array<Object>> {
    return this.http.get(this.apiUrl + 'userId/' + userId, { headers: this.getJsonHeaders() })
      .toPromise()
      .then(response => response.json() as Array<Object>)
      .catch(this.handleError);
  }
  getOwn(): Promise<Array<Object>> {
    return this.http.get(this.apiUrl + 'own', { headers: this.getJsonHeaders() })
      .toPromise()
      .then(response => response.json() as Array<Object>)
      .catch(this.handleError);
  }

  getPage(page, size): Promise<Array<Object>> {
    return this.http.get(this.apiUrl + 'page?page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .toPromise()
      .then(response => response.json() as Array<Object>)
      .catch(this.handleError);
  }

  getCombo(): Promise<Array<Object>> {
    return this.http.get(this.apiUrl + 'combo', { headers: this.getJsonHeaders() })
      .toPromise()
      .then(response => response.json() as Array<Object>)
      .catch(this.handleError);
  }

  getOne(id: number): Promise<Object> {
    return this.http.get(this.apiUrl + id, { headers: this.getJsonHeaders() })
      .toPromise()
      .then(response => response.json() as Object)
      .catch(this.handleError);
  }

  save(object: Object): Promise<Object> {
    return this.http
      .post(this.apiUrl, JSON.stringify(object), { headers: this.getJsonHeaders() })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  toggle(userId: number, menuId: number): Promise<Object> {
    return this.http
      .post(this.apiUrl + 'toggle/' + userId + '/' + menuId, { headers: this.getJsonHeaders() })
      .toPromise()
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
