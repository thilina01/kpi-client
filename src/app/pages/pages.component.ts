import { Component } from '@angular/core';
import { Routes, Router } from '@angular/router';

import { BaMenuService } from '../theme';
import { MENU } from '../app.menu';
import { Message } from 'primeng/primeng';
import { SharedService } from '../services/shared.service';
import { MenuService } from '../services/menu.service';
import { UserMenuService } from "../services/userMenu.service";
import { Cookie } from "ng2-cookies/ng2-cookies";
//import { AuthService } from "../services/auth.service";

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
    //private authService: AuthService,
    private router: Router) {
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
    //this.w3_open();
    //this._menuService.updateMenuByRoutes(<Routes>MENU);
    //this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
  }
  /**************************** */
  menuType = { code: "ng", name: "Angular" };

  menuList = [
    { routerLink: "/login", name: "Logout", menuType: this.menuType },
    { routerLink: "/pages/absenteeism/table", name: "Absenteeism", menuType: this.menuType },
    { routerLink: "/pages/addressType/table", name: "Address Type", menuType: this.menuType },
    { routerLink: "/pages/application/table", name: "Application", menuType: this.menuType },
    { routerLink: "/pages/breakdown/table", name: "Breakdown", menuType: this.menuType },
    { routerLink: "/pages/chart", name: "Charts", menuType: this.menuType },
    { routerLink: "/pages/computer/table", name: "Computer", menuType: this.menuType },
    { routerLink: "/pages/computerType/table", name: "Computer Type", menuType: this.menuType },
    { routerLink: "/pages/controlPoint/table", name: "Control Point", menuType: this.menuType },
    { routerLink: "/pages/controlPointMachine/table", name: "Control Point Machine", menuType: this.menuType },
    { routerLink: "/pages/controlPointType/table", name: "Control Point Type", menuType: this.menuType },
    { routerLink: "/pages/containerSize/table", name: "Container Size ", menuType: this.menuType },
    { routerLink: "/pages/contactType/table", name: "Contact Type ", menuType: this.menuType },
    { routerLink: "/pages/costCenter/table", name: "Cost Center", menuType: this.menuType },
    { routerLink: "/pages/country/table", name: "Country", menuType: this.menuType },
    { routerLink: "/pages/currency/table", name: "Currency", menuType: this.menuType },
    { routerLink: "/pages/customer/table", name: "Customer", menuType: this.menuType },
    { routerLink: "/pages/customerItem/table", name: "Customer Item", menuType: this.menuType },         
    { routerLink: "/pages/customerType/table", name: "Customer Type", menuType: this.menuType },
    { routerLink: "/pages/cumulativeSalesPerKg/table", name: "Cumulative Sales Per Kg", menuType: this.menuType },
    { routerLink: "/pages/consumableCostPerKg/table", name: "Consumable Cost Per Kg", menuType: this.menuType },
    { routerLink: "/pages/dashboard", name: "Dashboard", menuType: this.menuType },
    { routerLink: "/pages/department/table", name: "Department", menuType: this.menuType },             
    { routerLink: "/pages/deliveryTerm/table", name: "Delivery Term ", menuType: this.menuType },
    { routerLink: "/pages/dispatchNote/table", name: "Dispatch Note", menuType: this.menuType },
    { routerLink: "/pages/dispatchRelease/table", name: "Dispatch Release", menuType: this.menuType },
    { routerLink: "/pages/dispatchSchedule/table", name: "Dispatch Schedule", menuType: this.menuType },
    { routerLink: "/pages/energyConsumption/table", name: "Energy Consumption", menuType: this.menuType },
    { routerLink: "/pages/electricityCostPerKg/table", name: "Electricity Cost Per Kg", menuType: this.menuType },
    { routerLink: "/pages/employee/table", name: "Employee", menuType: this.menuType },
    { routerLink: "/pages/financeSummary/table", name: "Finance Summary", menuType: this.menuType },
    { routerLink: "/pages/home", name: "Home", menuType: this.menuType },
    { routerLink: "/pages/incoterm/table", name: "Incoterm", menuType: this.menuType },
    { routerLink: "/pages/item/table", name: "Item", menuType: this.menuType },
    { routerLink: "/pages/itemType/table", name: "Item Type", menuType: this.menuType },
    { routerLink: "/pages/job/info", name: "Job Information", menuType: this.menuType },
    { routerLink: "/pages/job/table", name: "Job", menuType: this.menuType },
    { routerLink: "/pages/jobType/table", name: "Job Type", menuType: this.menuType },
    { routerLink: "/pages/labourCostPerKg/table", name: "Labour Cost Per Kg", menuType: this.menuType },
    { routerLink: "/pages/labourSource/table", name: "Labour Source", menuType: this.menuType },
    { routerLink: "/pages/leaveType/table", name: "Leave Type", menuType: this.menuType },
    { routerLink: "/pages/lossReason/table", name: "Loss Reason", menuType: this.menuType },
    { routerLink: "/pages/lossType/table", name: "Loss Type", menuType: this.menuType },
    { routerLink: "/pages/location/table", name: "Location", menuType: this.menuType },
    { routerLink: "/pages/machine/table", name: "Machine", menuType: this.menuType },
    { routerLink: "/pages/mailConfiguration/table", name: "Mail Configuration ", menuType: this.menuType },
    { routerLink: "/pages/materialCostPerKg/table", name: "Material Cost Per Kg", menuType: this.menuType },
    { routerLink: "/pages/manpower", name: "Manpower", menuType: this.menuType },
    { routerLink: "/pages/manpowerType/table", name: "Manpower Type", menuType: this.menuType },
    { routerLink: "/pages/notifyParty/table", name: "Notify Party", menuType: this.menuType },
    { routerLink: "/pages/operation/table", name: "Operation", menuType: this.menuType },
    { routerLink: "/pages/operationType/table", name: "Operation Type", menuType: this.menuType },
    { routerLink: "/pages/organization/table", name: "Organization", menuType: this.menuType },
    { routerLink: "/pages/paint/table", name: "Paint", menuType: this.menuType },
    { routerLink: "/pages/paymentTerm/table", name: "Payment Term", menuType: this.menuType },
    { routerLink: "/pages/permission/form", name: "Permission", menuType: this.menuType },
    { routerLink: "/pages/plan", name: "Plan", menuType: this.menuType },
    { routerLink: "/pages/production/table", name: "Production", menuType: this.menuType },
    { routerLink: "/pages/productionOverheadCostPerKg/table", name: "Production Overhead Cost Per Kg", menuType: this.menuType },
    { routerLink: "/pages/productType/table", name: "Product Type", menuType: this.menuType },    
    { routerLink: "/pages/salesPerKg/table", name: "Sales Per Kg", menuType: this.menuType },
    { routerLink: "/pages/salesOrder/table", name: "Sales Order", menuType: this.menuType },
    { routerLink: "/pages/salesOrderType/table", name: "Sales Order Type", menuType: this.menuType },
    { routerLink: "/pages/salesValue/table", name: "Sales Value", menuType: this.menuType },   
    { routerLink: "/pages/salesWeight/table", name: "Sales Weight", menuType: this.menuType },
    { routerLink: "/pages/scrap/table", name: "Scrap", menuType: this.menuType },
    { routerLink: "/pages/scrapCostPerKg/table", name: "Scrap Cost Per Kg", menuType: this.menuType },
    { routerLink: "/pages/section/table", name: "Section", menuType: this.menuType },
    { routerLink: "/pages/sectionType/table", name: "Section Type", menuType: this.menuType },
    { routerLink: "/pages/shift/table", name: "Shift", menuType: this.menuType },
    { routerLink: "/pages/shiftType/table", name: "Shift Type", menuType: this.menuType },
    { routerLink: "/pages/supplierType/table", name: "Supplier Type", menuType: this.menuType },
    { routerLink: "/pages/team/table", name: "Team", menuType: this.menuType },
    { routerLink: "/pages/tool/table", name: "Tool", menuType: this.menuType },
    { routerLink: "/pages/toolBreakdown/table", name: "Tool Breakdown", menuType: this.menuType },
    { routerLink: "/pages/workCenter/table", name: "Work Center", menuType: this.menuType }
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


  //brands: string[] = ['Audi','BMW','Fiat','Ford','Honda','Jaguar','Mercedes','Renault','Volvo','VW'];

  filteredMenus: any[];

  filterMenus(event) {
    this.filteredMenus = [];
    for (let i = 0; i < this.menuList.length; i++) {
      let menu = this.menuList[i];
      if (menu.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredMenus.push(menu);
      }
    }
  }

  handleDropdownClick() {
    this.filteredMenus = [];

    //mimic remote call
    setTimeout(() => {
      this.filteredMenus = this.menuList;
    }, 100)
  }
  menu: any;
  onSelect(menu: any) {
    this.router.navigate([menu.routerLink]);
    console.log(event)    
    this.menu={name:""}
  }
}
