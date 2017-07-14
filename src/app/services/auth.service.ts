import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
// import { Cookie } from 'ng2-cookies/ng2-cookies';
// import 'rxjs/add/operator/toPromise';

import { APP_CONFIG, IAppConfig } from '../app.config';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/delay';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {

  isLoggedIn: boolean = false;
  email: string = "";
  private getJsonHeaders(): Headers {
    return new Headers({
      'Content-Type': 'application/json',
      'email': this.email
    });
  };
  /*
    isLoggedIn(): boolean {
      return true;
      //return Cookie.get("email") != undefined;
    }*/
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  //private headers: Headers;
  private apiUrl: string;  // URL to web api

  constructor(
    private http: Http,
    @Inject(APP_CONFIG) private config: IAppConfig,
    public afireauth: AngularFireAuth) {
    ////this.headers = new Headers(config.jsonHeaders);
    this.apiUrl = config.apiEndpoint + 'accounts/';
    this.afireauth.authState.subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.email = auth.email;
      } else {
        this.isLoggedIn = false;
        this.email = "";
      }
    });
  }
  /*
    loginx(values: any): Observable<boolean> {
      return this.http
        .post(this.apiUrl + 'login', JSON.stringify(values), { headers: this.getJsonHeaders() })
        .map(response => {
          if (response.text() === 'true') {
            Cookie.set('email', values.email)
            return true;
          }
          return false;
        })
        .catch(this.handleError);
    }
  */
  login(values: any): Promise<any> {
    //let result: boolean = false;
    values.passwordAgain = values.password;
    return this.http
      .post(this.apiUrl + 'login', JSON.stringify(values), { headers: this.getJsonHeaders() })
      .toPromise()
      .then(response => {
        let text = response.text();
        if (text === 'true') {
          return { status: true };
        }
        return { status: false };
      })
      .catch((error) => {
        this.handleError(error);
        return { status: false };
      });
  }

  logout() {
    this.afireauth.auth.signOut();
    // let email = Cookie.get('email')
    // if (email == undefined) return;
    // this.http
    //   .post(this.apiUrl + 'logout', { email: email }, { headers: this.getJsonHeaders() })
    //   .toPromise()
    //   .then(response => {
    //     Cookie.delete('email');
    //   })
    //   .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    alert(JSON.parse(error._body).message);
    return Promise.reject(error.message || error);
  }
  /******************************** */

  afLogin(credentials: any) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
        // this.login(credentials).then(() => {
        //   resolve(true);
        // });
        resolve(false);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }
  addUser(newuser) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: ''
        }).then(() => {
          resolve({ success: true });

          // this.firedata.child(this.afireauth.auth.currentUser.uid).set({
          //   uid: this.afireauth.auth.currentUser.uid,
          //   displayName: newuser.displayName,
          //   photoURL: 'give a dummy placeholder url here'
          // }).then(() => {
          //   resolve({ success: true });
          //   }).catch((err) => {
          //     reject(err);
          // })
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
