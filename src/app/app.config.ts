import {OpaqueToken} from '@angular/core';

export let APP_CONFIG = new OpaqueToken('app.config');

export interface IAppConfig {
  apiEndpoint: string;
}

let protocol = location.protocol;
let hostname = location.hostname;
let apiEndpoint =
  hostname === 'kpi.trwlanka.com' ||
  hostname === 'otr-kpi.firebaseapp.com' ||
  hostname === 'otr-kpi.nanosl.com' ||
  hostname === 'kpi.otrlanka.com'
    ? protocol + '//api.otrlanka.com/'
    : hostname === '192.168.1.171'
    ? protocol + '//' + hostname + '/api/'
    : protocol + '//' + hostname + ':8080/';

export const AppConfig: IAppConfig = {
  apiEndpoint: apiEndpoint
};
