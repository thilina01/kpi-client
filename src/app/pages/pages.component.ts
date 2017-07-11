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

    this.main = document.getElementById("main");
    this.footer = document.getElementById("footer");
    this.mySidebar = document.getElementById("mySidebar");
    //this.openNav = document.getElementById("openNav");
    this.w3_open();
    //this._menuService.updateMenuByRoutes(<Routes>MENU);
    //this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
  }
  /**************************** */
  menuList = [
    { routerLink: "/pages/dashboard", name: "Home" },
    { routerLink: "/pages/chart", name: "Charts" },
    { routerLink: "/pages/plan", name: "Plan" },
    { routerLink: "/pages/production/table", name: "Production" },
    { routerLink: "/pages/breakdown/table", name: "Breakdown" },
    { routerLink: "/pages/toolBreakdown/table", name: "Tool Breakdown" },
    { routerLink: "/pages/energyConsumption/table", name: "Energy Consumption" },
    { routerLink: "/pages/labourTurnover/table", name: "Labour Turnover" },
    { routerLink: "/pages/absenteeism/table", name: "Absenteeism" },
    { routerLink: "/pages/job/table", name: "Job" },
    { routerLink: "/pages/job/info", name: "Job Information" },
    { routerLink: "/pages/item/table", name: "Item" },
    { routerLink: "/pages/section/table", name: "Section" },
    { routerLink: "/pages/controlPoint/table", name: "Control Point" },
    { routerLink: "/pages/controlPointType/table", name: "Control Point Type" },
    { routerLink: "/pages/machine/table", name: "Machine" },
    { routerLink: "/pages/tool/table", name: "Tool" },
    { routerLink: "/pages/shift/table", name: "Shift" },
    { routerLink: "/pages/shiftType/table", name: "Shift Type" },
    { routerLink: "/pages/controlPointMachine/table", name: "Control Point Machine" },
    { routerLink: "/pages/operation/table", name: "Operation" },
    { routerLink: "/pages/operationType/table", name: "Operation Type" },
    { routerLink: "/pages/manpower", name: "Manpower" },
    { routerLink: "/pages/location/table", name: "Location" },
    { routerLink: "/pages/labourSource/table", name: "Labour Source" },
    { routerLink: "/pages/jobType/table", name: "Job Type" },
    { routerLink: "/login", name: "Logout" }
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
