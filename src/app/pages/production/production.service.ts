import { Injectable, Inject } from '@angular/core';
import { MasterService } from "../../services/master.service";
import { HttpClient } from "@angular/common/http";
import { APP_CONFIG, IAppConfig } from "../../app.config";
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ProductionService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('productions/');
  }
  findByProductionDateAndShiftAndControlPoint(object: Object): Observable<any> {
    return this.http
      .post(this.apiUrl + "ByProductionDateAndShiftAndControlPoint", JSON.stringify(object), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getByProductionDurationPage(startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + "productionDurationPage?startDate=" + startDate + "&endDate=" + endDate + "&page=" + page + "&size=" + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getByProductionDurationAndShiftPage(shift, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'productionDurationAndShiftPage?shift=' + shift + '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getBySectionAndProductionDurationPage(section, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + "sectionAndProductionDurationPage?section=" + section + "&startDate=" + startDate + "&endDate=" + endDate + "&page=" + page + "&size=" + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getBySectionAndProductionDurationAndShiftPage(section, startDate, endDate, shift, page, size): Observable<any> {
    return this.http.get(this.apiUrl + "sectionAndProductionDurationAndShiftPage?section=" + section + "&startDate=" + startDate + "&endDate=" + endDate + "&shift=" + shift + "&page=" + page + "&size=" + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getByProductionDurationAndControlPointTypePage(startDate, endDate, controlPointType, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'productionDurationAndControlPointTypePage?startDate=' + startDate + '&endDate=' + endDate + '&controlPointType=' + controlPointType + '&page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getBySectionAndShiftAndProductionDurationAndControlPointTypePage(section, shift, startDate, endDate, controlPointType, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'sectionAndShiftAndProductionDurationAndControlPointTypePage?section=' + section + '&shift=' + shift + '&startDate=' + startDate + '&endDate=' + endDate + '&controlPointType=' + controlPointType + '&page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getByControlPointTypeAndProductionDurationAndShiftPage(controlPointType, startDate, endDate, shift, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'controlPointTypeAndProductionDurationAndShiftPage?controlPointType=' + controlPointType + '&startDate=' + startDate + '&endDate=' + endDate + '&shift=' + shift + '&page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
  getByControlPointTypeAndProductionDurationAndSectionPage(controlPointType, startDate, endDate, section, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'controlPointTypeAndProductionDurationAndSectionPage?controlPointType=' + controlPointType + '&startDate=' + startDate + '&endDate=' + endDate + '&section=' + section + '&page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
}
// import { Injectable, Inject } from '@angular/core';
// import { Headers, Http } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
// import { Subject } from 'rxjs/Subject';

// import { APP_CONFIG, IAppConfig } from '../../app.config';
// import { AuthService } from "../../services/auth.service";


// @Injectable()
// export class ProductionService {

//     private headers: Headers; // = new Headers({ 'Content-Type': 'application/json' });
//     private apiUrl: string;  // URL to web api
//     private selected = {};
//     private selectedId = 0;
//     private getJsonHeaders(): Headers{
//         return new Headers({
//           'Content-Type': 'application/json',
//           'email': this.authService.email
//         });
//       };
//     selectionChange: Subject<any> = new Subject<any>();

//     constructor(private http: Http, @Inject(APP_CONFIG) private config: IAppConfig, private authService: AuthService) {
//         this.apiUrl = config.apiEndpoint + 'productions/';
//         //this.headers = new Headers(config.jsonHeaders);
//     }

//     getAll(): Promise<Array<Object>> {
//         return this.http.get(this.apiUrl, { headers: this.getJsonHeaders() })
//             .toPromise()
//             .then(response => response.json() as Array<Object>)
//             .catch(this.handleError);
//     }

//     getPage(page, size): Promise<Array<Object>> {
//         return this.http.get(this.apiUrl + "page?page=" + page + "&size=" + size, { headers: this.getJsonHeaders() })
//             .toPromise()
//             .then(response => response.json() as Array<Object>)
//             .catch(this.handleError);
//     }

//     getOne(id: number): Promise<Object> {
//         return this.http.get(this.apiUrl + id, { headers: this.getJsonHeaders() })
//             .toPromise()
//             .then(response => response.json() as Object)
//             .catch(this.handleError);
//     }
//     findByProductionDateAndShiftAndControlPoint(object: Object): Promise<Object> {
//         return this.http
//             .post(this.apiUrl + "ByProductionDateAndShiftAndControlPoint", JSON.stringify(object), { headers: this.getJsonHeaders() })
//             .toPromise()
//             .then(response => response.json() as Object)
//             .catch(this.handleError);
//     }
//     setSelected(id: number) {
//         this.selectedId = id;
//         this.getSelected().then((data) => {
//             this.selectionChange.next(data);
//         });
//     }

//     getSelected(): Promise<Object> {
//         return this.getOne(this.selectedId);
//     }

//     save(object: Object): Promise<Object> {
//         return this.http
//             .post(this.apiUrl, JSON.stringify(object), { headers: this.getJsonHeaders() })
//             .toPromise()
//             .then(res => res.json().data)
//             .catch(this.handleError);
//     }

//     delete(id: number): Promise<Object> {
//         return this.http
//             .delete(this.apiUrl + id, { headers: this.getJsonHeaders() })
//             .toPromise()
//             .catch(this.handleError);
//     }

//     private handleError(error: any): Promise<any> {
//         console.error('An error occurred', error); // for demo purposes only
//         alert(JSON.parse(error._body).message);
//         return Promise.reject(error.message || error);
//     }
// }
