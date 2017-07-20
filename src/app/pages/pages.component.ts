import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { MENU } from '../app.menu';
import { Message } from 'primeng/primeng';
import { SharedService } from '../services/shared.service';
import { MenuService } from '../services/menu.service';
import { UserMenuService } from "../services/userMenu.service";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'pages',
  styleUrls: ['./pages.scss'],
  templateUrl: './pages.html',
  providers: [SharedService]
})
export class Pages {
  msgs: Message[] = [];
  logoPath = '/assets/img/logo.png'
  constructor(private _menuService: BaMenuService,
    private sharedService: SharedService,
    private menuService: MenuService,
    private userMenuService: UserMenuService,
    private authService: AuthService) {
    sharedService.messageSubject.subscribe(
      message => {
        this.msgs.push(message);
      });
  }

  ngOnInit() {
    this.main = document.getElementById("main");
    this.footer = document.getElementById("footer");
    this.mySidebar = document.getElementById("mySidebar");
    //this.openNav = document.getElementById("openNav");
    this.menuService.saveMany(this.menuList);
    this.menuList = [];
    //let email = Cookie.get('email') !== undefined ? Cookie.get('email') : '';

    this.userMenuService.getOwn().then((data: any) => {
      data.forEach(userMenu => {
        this.menuList.push(userMenu.menu)
      });
      //this.menus = data;
    });

    // this.menuService.getByType(this.menuType).then(
    //   (data: any) => {
    //     this.menuList = data;
    //     this.w3_open();
    //   })
    this.w3_open();
    //this._menuService.updateMenuByRoutes(<Routes>MENU);
    //this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
  }
  /**************************** */
  menuType = { code: "ng", name: "Angular" };

  menuList = [
    { routerLink: "/login", name: "Logout", menuType: this.menuType },
    { routerLink: "/pages/absenteeism/table", name: "Absenteeism", menuType: this.menuType },
    { routerLink: "/pages/breakdown/table", name: "Breakdown", menuType: this.menuType },
    { routerLink: "/pages/chart", name: "Charts", menuType: this.menuType },
    { routerLink: "/pages/controlPoint/table", name: "Control Point", menuType: this.menuType },
    { routerLink: "/pages/controlPointMachine/table", name: "Control Point Machine", menuType: this.menuType },
    { routerLink: "/pages/controlPointType/table", name: "Control Point Type", menuType: this.menuType },
    { routerLink: "/pages/currency/table", name: "Currency", menuType: this.menuType },
    { routerLink: "/pages/customer/table", name: "Customer", menuType: this.menuType },
    { routerLink: "/pages/customerType/table", name: "Customer Type", menuType: this.menuType },
    { routerLink: "/pages/dashboard", name: "Home", menuType: this.menuType },
    { routerLink: "/pages/energyConsumption/table", name: "Energy Consumption", menuType: this.menuType },
    { routerLink: "/pages/incoterm/table", name: "Incoterm", menuType: this.menuType },
    { routerLink: "/pages/item/table", name: "Item", menuType: this.menuType },
    { routerLink: "/pages/job/info", name: "Job Information", menuType: this.menuType },
    { routerLink: "/pages/job/table", name: "Job", menuType: this.menuType },
    { routerLink: "/pages/jobType/table", name: "Job Type", menuType: this.menuType },
    { routerLink: "/pages/labourSource/table", name: "Labour Source", menuType: this.menuType },
    { routerLink: "/pages/labourTurnover/table", name: "Labour Turnover", menuType: this.menuType },
    { routerLink: "/pages/location/table", name: "Location", menuType: this.menuType },
    { routerLink: "/pages/machine/table", name: "Machine", menuType: this.menuType },
    { routerLink: "/pages/manpower", name: "Manpower", menuType: this.menuType },
    { routerLink: "/pages/operation/table", name: "Operation", menuType: this.menuType },
    { routerLink: "/pages/operationType/table", name: "Operation Type", menuType: this.menuType },    
    { routerLink: "/pages/permission/form", name: "Permission", menuType: this.menuType },
    { routerLink: "/pages/plan", name: "Plan", menuType: this.menuType },
    { routerLink: "/pages/production/table", name: "Production", menuType: this.menuType },
    { routerLink: "/pages/section/table", name: "Section", menuType: this.menuType },
    { routerLink: "/pages/shift/table", name: "Shift", menuType: this.menuType },
    { routerLink: "/pages/shiftType/table", name: "Shift Type", menuType: this.menuType },
    { routerLink: "/pages/tool/table", name: "Tool", menuType: this.menuType },
    { routerLink: "/pages/toolBreakdown/table", name: "Tool Breakdown", menuType: this.menuType }
  ];
  main;
  footer;
  mySidebar;
  openNav;

  ngAfterViewInit() {
  }
  w3_toggle() {
    if (document.getElementById("mySidebar").style.display != 'none') {
      this.w3_close();
    } else {
      this.w3_open();
    }
  }
  w3_open() {
    this.main.style.marginLeft = "200px";
    this.footer.style.marginLeft = "200px";
    this.mySidebar.style.width = "200px";
    this.mySidebar.style.display = "block";
    //this.openNav.style.display = 'none';
  }
  w3_close() {
    this.main.style.marginLeft = "0%";
    this.footer.style.marginLeft = "0%";
    this.mySidebar.style.display = "none";
    //this.openNav.style.display = "inline-block";
  }
}
