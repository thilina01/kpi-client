import {Component} from '@angular/core';
import { Router,Routes } from '@angular/router';

import { BaMenuService } from '../../theme';
import { MENU } from '../../app.menu';

@Component({
    selector: 'financeSummary',
    styles: [],
    template: ` 
    <router-outlet></router-outlet>`
})
export class FinanceSummary {

    constructor(private router: Router, private _menuService: BaMenuService) {
    }
    ngOnInit() {
        this._menuService.updateMenuByRoutes(<Routes>MENU);
        //this.router.navigate(['/pages/financeSummary/table']);
    }

}
