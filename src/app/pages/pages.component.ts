import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { MENU } from '../app.menu';
import { Message } from 'primeng/primeng';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'pages',
    styleUrls: ['./pages.scss'],
  templateUrl: './pages.html',
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
