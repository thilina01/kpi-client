import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExchangeRateService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('exchangeRates/');
  }

  // getByCurrencyAndExchangeRateDate(id: number): Observable<any> {
  //   return this.http.get(this.apiUrl + 'currencyAndExchangeRateDate/' + id, { headers: this.getJsonHeaders() })
  //     .catch(err => this.handleError(err));
  // }

  getByCurrencyAndExchangeRateDate(currencyId, startDate, endDate): Observable<any> {
    return this.http.get(this.apiUrl + 'currencyAndExchangeRateDuration?currencyId=' + currencyId + '&startDate=' + startDate+ '&endDate=' + endDate, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getByCurrencyAndExchangeRateDateBetweenPage(currency, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'currencyAndExchangeRateDateBetween?currency=' + currency+  '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

}
