import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let loginTimeMills = localStorage.getItem('loginTimeMills');
        if (loginTimeMills) {
            request = request.clone({
                setHeaders: {
                    'loginTimeMills': loginTimeMills
                }
            });
        }
        return next.handle(request);
    }
}