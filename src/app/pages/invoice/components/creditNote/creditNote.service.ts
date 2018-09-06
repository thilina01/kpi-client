
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../../../app.config';
import { AuthService } from '../../../../services/auth.service';
import { MasterService } from '../../../../services/master.service';

@Injectable()
export class CreditNoteService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('creditNotes/');
   }
}

