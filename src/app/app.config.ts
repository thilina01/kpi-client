import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken('app.config');

export interface IAppConfig {
  apiEndpoint: string;
}
let hostname = location.hostname;
let apiEndpoint = (hostname === 'kpi.trwlanka.com' || hostname === 'otr-kpi.firebaseapp.com' || hostname === 'otr-kpi.nanosl.com') ? 'http://tmsapi.trwlanka.com/' : hostname === '192.168.1.171' ? 'http://' + hostname + ':8080/file-manager-api/' : 'http://' + hostname + ':8080/';

export const AppConfig: IAppConfig = {

  apiEndpoint: apiEndpoint,

};
