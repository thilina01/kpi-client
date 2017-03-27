import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';

import { APP_CONFIG, IAppConfig } from '../app.config';

import { Message } from 'primeng/primeng';

@Injectable()
export class SharedService {

  messageSubject: Subject<any> = new Subject<any>();

  addMessage(message: any) {
    this.messageSubject.next(message);
    console.log("Message added: " + message)
  }

  ngOnInit(): void {
    //this.addMessage({ cc: 'fgbsdhgrhrdhdry' });
  }

  YYYYMMDD(date: Date): string {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

}
