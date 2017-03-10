import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { MENU } from '../app.menu';
import { Message } from 'primeng/primeng';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'pages',
  styles: [],
  template: `
  <p-growl [value]="msgs"></p-growl>
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <!-- <ba-content-top></ba-content-top> -->
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right">TRW Lanka</div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy;  2016</div>
        <ul class="al-share clearfix">
          <li><i class="socicon socicon-facebook"></i></li>
          <li><i class="socicon socicon-twitter"></i></li>
          <li><i class="socicon socicon-google"></i></li>
          <li><i class="socicon socicon-github"></i></li>
        </ul>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `,
  providers: [SharedService]
})
export class Pages {
  msgs: Message[] = [];
  constructor(private _menuService: BaMenuService, private sharedService: SharedService) {
    sharedService.messageSubject.subscribe(
      message => {
        console.log(message)
        this.msgs.push(message);
      });
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>MENU);
    //this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
  }
}
