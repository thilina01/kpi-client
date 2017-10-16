import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { APP_CONFIG, IAppConfig } from '../app.config';

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  isLoggedIn: boolean = false;
  email: string = '';
  private getJsonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'email': this.email
    });
  };
  redirectUrl: string = '/pages/home';
  //private headers: Headers;
  private apiUrl: string;  // URL to web api

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: IAppConfig,
    public afireauth: AngularFireAuth) {
    this.apiUrl = config.apiEndpoint + 'accounts/';
    this.afireauth.authState.subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.email = auth.email;
      } else {
        this.isLoggedIn = false;
        this.email = '';
      }
    });
  }

  login(values: any): Observable<any> {
    values.passwordAgain = values.password;
    return this.http.post(this.apiUrl + 'login', JSON.stringify(values), { headers: this.getJsonHeaders() });

  }

  logout() {
    if (this.afireauth.auth.currentUser) {
      this.afireauth.auth.signOut();
    }

  }

  private handleError(error: any) {
    console.error('An error occurred', error); // for demo purposes only
    if (error.message) {
      alert(error.message);
    } else if (error._body) {
      alert(JSON.parse(error._body).message);
    }
  }
  /*********************************/

  afLogin(credentials: any) {
    let promise = new Promise((resolve, reject) => {
      this.afireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {

        resolve(false);
      }).catch((err) => {
        this.handleError(err);
        reject(err);
      })
    })
    return promise;
  }
  addUser(newuser) {
    let promise = new Promise((resolve, reject) => {
      this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: ''
        }).then(() => {
          resolve({ success: true });
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }
}
