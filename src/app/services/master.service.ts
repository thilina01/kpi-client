import { Injectable, Inject } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import { IAppConfig, APP_CONFIG } from "../app.config";
import { AuthService } from "./auth.service";

//@Injectable()
export class MasterService {
    private getJsonHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'email': this.authService.email
        });
    };
    private headers: Headers; // = new Headers({ 'Content-Type': 'application/json' });
    private apiUrl: string;  // URL to web api

    constructor(private http: HttpClient, private config: IAppConfig, private authService: AuthService) {
    }

    setApiUrl(path: string) {
        this.apiUrl = this.config.apiEndpoint + path;
    }

    getAll(): Observable<any> {
        return this.http.get(this.apiUrl, { headers: this.getJsonHeaders() })
            .catch(err => this.handleError(err));
    }

    getPage(page, size): Observable<any> {
        return this.http.get(this.apiUrl + "page?page=" + page + "&size=" + size, { headers: this.getJsonHeaders() })
            .catch(err => this.handleError(err));
    }

    getCombo(): Observable<any> {
        return this.http.get(this.apiUrl + "combo", { headers: this.getJsonHeaders() })
            .catch(err => this.handleError(err));
    }

    getOne(id: number): Observable<any> {
        return this.http.get(this.apiUrl + id, { headers: this.getJsonHeaders() })
            .catch(err => this.handleError(err));
    }

    save(object: Object): Observable<any> {

        return this.http
            .post(this.apiUrl, JSON.stringify(object), { headers: this.getJsonHeaders() })
            .catch(err => this.handleError(err));
    }

    delete(id: number): Observable<any> {

        return this.http
            .delete(this.apiUrl + id, { headers: this.getJsonHeaders() })
            .catch(err => this.handleError(err));
    }

    private handleError(error: any): Observable<any> {
        console.error('An error occurred', error); // for demo purposes only    
        alert(JSON.parse(error._body).message);
        return Observable.empty<Response>();
    }
}
