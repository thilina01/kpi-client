import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig, APP_CONFIG } from '../app.config';
import { AuthService } from './auth.service';
import { MasterService } from './master.service';

@Injectable()
export class DispatchService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('dispatches/');
  }
}
