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
    console.log("Message added: "+message)
  }
  ngOnInit(): void {
    this.addMessage({ cc: 'fgbsdhgrhrdhdry' });
  }
}
