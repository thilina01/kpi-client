import {Component} from '@angular/core';
import { Router,Routes } from '@angular/router';

import { BaMenuService } from '../../theme';
import { MENU } from '../../app.menu';

@Component({
    selector: 'labourTurnover',
    styles: [],
    template: ` 
    <router-outlet></router-outlet>`
})
export class LabourTurnover {

    constructor(private router: Router, private _menuService: BaMenuService) {
    }
    ngOnInit() {
        this._menuService.updateMenuByRoutes(<Routes>MENU);
        //this.router.navigate(['/pages/labourTurnover/table']);
    }

}
