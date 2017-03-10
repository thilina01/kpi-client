import { OpaqueToken } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

export let APP_CONFIG = new OpaqueToken('app.config');

export interface IAppConfig {
  apiEndpoint: string;
  jsonHeaders: Object;
}

let hostname = location.hostname;
let apiEndpoint = hostname === 'kpi.trwlanka.com' ? 'http://tmsapi.trwlanka.com/' : hostname === '192.168.1.171' ? 'http://' + hostname + ':8080/file-manager-api/' : 'http://' + hostname + ':8080/';

this.email = Cookie.get('email') !== undefined ? Cookie.get('email') : 'admin@trwlanka.com';

export const AppConfig: IAppConfig = {
  // apiEndpoint: 'http://tmsapi.trwlanka.com/'
  //apiEndpoint: 'http://localhost:8080/file-manager-api/'
  apiEndpoint: apiEndpoint,
  jsonHeaders: {
    'Content-Type': 'application/json',
    'email': this.email
  }
  
};
