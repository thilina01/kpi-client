import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('items/');
  }
  getPageByItemType(itemType: any, page, size): Observable<any> {
    return this.http.post(this.apiUrl + 'pageByItemType?page=' + page + '&size=' + size, JSON.stringify(itemType), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getItemPage(code, itemSize, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'itemPage?code=' + code + '&itemSize=' + itemSize + '&page=' + page + '&size=' + size)
      .catch(err => this.handleError(err));
  }

}
