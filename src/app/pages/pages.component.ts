import { Component } from '@angular/core';
import { Routes, Router } from '@angular/router';

import { BaMenuService } from '../theme';
import { MENU } from '../app.menu';
import { Message } from 'primeng/primeng';
import { SharedService } from '../services/shared.service';
import { MenuService } from '../services/menu.service';
import { UserMenuService } from '../services/userMenu.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { OrganizationService } from './organization/organization.service';

@Component({
  selector: 'pages',
  styleUrls: ['./pages.scss'],
  templateUrl: './pages.html',
  providers: [SharedService]
})
export class Pages {
  organization: any;
  msgs: Message[] = [];
  logoPath = '/assets/img/logo.png';
  constructor(private _menuService: BaMenuService,
    private sharedService: SharedService,
    private menuService: MenuService,
    private userMenuService: UserMenuService,
    private organizationService: OrganizationService,
    private router: Router) {

    sharedService.messageSubject.subscribe(
      message => {
        this.msgs.push(message);
      });
    this.getOrganization();
  }

  getOrganization() {
    this.organizationService.getAll().subscribe((data: any) => {
      this.organization = data[0];
    });
  }

  ngOnInit() {
    this.main = document.getElementById('main');
    this.footer = document.getElementById('footer');
    this.mySidebar = document.getElementById('mySidebar');
    this.menuService.saveMany(this.menuList);
    this.menuList = [];

    this.userMenuService.getOwn().then((data: any) => {
      data.forEach(userMenu => {
        this.menuList.push(userMenu.menu)
      });
    });
  }
  menuType = { code: 'ng', name: 'Angular' };

  menuList = [
    { routerLink: '/login', name: 'Logout', menuType: this.menuType },
    { routerLink: '/pages/absenteeism/table', name: 'Absenteeism', menuType: this.menuType },
    { routerLink: '/pages/accident/table', name: 'Accident ', menuType: this.menuType },
    { routerLink: '/pages/accidentTypes/table', name: 'Accident Type ', menuType: this.menuType },
    { routerLink: '/pages/addressTypes/table', name: 'Address Type', menuType: this.menuType },
    { routerLink: '/pages/application/table', name: 'Application', menuType: this.menuType },
    { routerLink: '/pages/breakdown/table', name: 'Breakdown', menuType: this.menuType },
    { routerLink: '/pages/chart', name: 'Charts', menuType: this.menuType },
    { routerLink: '/pages/computer/table', name: 'Computer', menuType: this.menuType },
    { routerLink: '/pages/computerTypes/table', name: 'Computer Type', menuType: this.menuType },
    { routerLink: '/pages/consumableCostPerKg/table', name: 'Consumable Cost Per Kg', menuType: this.menuType },
    { routerLink: '/pages/contactTypes/table', name: 'Contact Type ', menuType: this.menuType },
    { routerLink: '/pages/containerSizes/table', name: 'Container Size ', menuType: this.menuType },
    { routerLink: '/pages/controlPoint/table', name: 'Control Point', menuType: this.menuType },
    { routerLink: '/pages/controlPointMachine/table', name: 'Control Point Machine', menuType: this.menuType },
    { routerLink: '/pages/controlPointTypes/table', name: 'Control Point Type', menuType: this.menuType },
    { routerLink: '/pages/costCenter/table', name: 'Cost Center', menuType: this.menuType },
    { routerLink: '/pages/countries/table', name: 'Country', menuType: this.menuType },
    { routerLink: '/pages/cumulativeSalesPerKg/table', name: 'Cumulative Sales Per Kg', menuType: this.menuType },
    { routerLink: '/pages/currencies/table', name: 'Currency', menuType: this.menuType },
    { routerLink: '/pages/customer/table', name: 'Customer', menuType: this.menuType },
    { routerLink: '/pages/customerItem/table', name: 'Customer Item', menuType: this.menuType },
    { routerLink: '/pages/customerTypes/table', name: 'Customer Type', menuType: this.menuType },
    { routerLink: '/pages/dashboard', name: 'Dashboard', menuType: this.menuType },
    { routerLink: '/pages/departments/table', name: 'Department', menuType: this.menuType },
    { routerLink: '/pages/designations/table', name: 'Designation', menuType: this.menuType },
    { routerLink: '/pages/drawingChangeRequest/table', name: 'Drawing Change Request', menuType: this.menuType },
    { routerLink: '/pages/dispatchInformation/table', name: 'Dispatch Information', menuType: this.menuType },
    { routerLink: '/pages/dispatchNote/table', name: 'Dispatch Note', menuType: this.menuType },
    { routerLink: '/pages/dispatchReject/table', name: 'Dispatch Reject', menuType: this.menuType },
    { routerLink: '/pages/dispatchRelease/table', name: 'Dispatch Release', menuType: this.menuType },
    { routerLink: '/pages/dispatchSchedule/table', name: 'Dispatch Schedule', menuType: this.menuType },
    { routerLink: '/pages/deliveryTerms/table', name: 'Delivery Term ', menuType: this.menuType },
    { routerLink: '/pages/drawingVersion/table', name: 'Drawing Version', menuType: this.menuType },
    { routerLink: '/pages/electricityCostPerKg/table', name: 'Electricity Cost Per Kg', menuType: this.menuType },
    { routerLink: '/pages/employee/table', name: 'Employee', menuType: this.menuType },
    { routerLink: '/pages/employeeCategories/table', name: 'Employee Category', menuType: this.menuType },
    { routerLink: '/pages/energyConsumption/table', name: 'Energy Consumption', menuType: this.menuType },
    { routerLink: '/pages/exchangeRate/table', name: 'Exchange Rate', menuType: this.menuType },
    { routerLink: '/pages/financeSummary/table', name: 'Finance Summary', menuType: this.menuType },
    { routerLink: '/pages/home', name: 'Home', menuType: this.menuType },
    { routerLink: '/pages/incoterms/table', name: 'Incoterm', menuType: this.menuType },
    { routerLink: '/pages/invoiceType/table', name: 'Invoice Type', menuType: this.menuType },
    { routerLink: '/pages/invoice/table', name: 'Invoice', menuType: this.menuType },
    { routerLink: '/pages/internalTransferArrival/table', name: 'Internal Transfer Arrival', menuType: this.menuType },
    { routerLink: '/pages/internalTransferNote/table', name: 'Internal Transfer Note', menuType: this.menuType },
    { routerLink: '/pages/internalTransferRelease/table', name: 'Internal Transfer Release', menuType: this.menuType },
    { routerLink: '/pages/invoiceInformation/table', name: 'Invoice Information', menuType: this.menuType },
    { routerLink: '/pages/salesOrderBook/table', name: 'Sales Order Book', menuType: this.menuType },
    { routerLink: '/pages/subcontractArrival/table', name: 'Subcontract Arrival', menuType: this.menuType },
    { routerLink: '/pages/subcontractArrivalReject/table', name: 'Subcontract Arrival Reject', menuType: this.menuType },
    { routerLink: '/pages/subcontractor/table', name: 'Subcontractor', menuType: this.menuType },
    { routerLink: '/pages/subcontractorOperation/table', name: 'Subcontractor Operation', menuType: this.menuType },
    { routerLink: '/pages/subcontractOperationDefinition/table', name: 'Subcontract Operation Definition', menuType: this.menuType },
    { routerLink: '/pages/subcontractOperationRate/table', name: 'Subcontract Operation Rate', menuType: this.menuType },
    { routerLink: '/pages/subcontractRelease/table', name: 'Subcontract Release', menuType: this.menuType },
    { routerLink: '/pages/subcontractNote/table', name: 'Subcontract Note', menuType: this.menuType },
    // { routerLink: '/pages/invoiceTypes/table', name: 'Invoice Type', menuType: this.menuType },
    { routerLink: '/pages/item/table', name: 'Item', menuType: this.menuType },
    { routerLink: '/pages/itemSegments/table', name: 'Item Segment', menuType: this.menuType },
    { routerLink: '/pages/itemTypes/table', name: 'Item Type', menuType: this.menuType },
    { routerLink: '/pages/job/info', name: 'Job Information', menuType: this.menuType },
    { routerLink: '/pages/job/table', name: 'Job', menuType: this.menuType },
    { routerLink: '/pages/jobTypes/table', name: 'Job Type', menuType: this.menuType },
    { routerLink: '/pages/labourCostPerKg/table', name: 'Labour Cost Per Kg', menuType: this.menuType },
    { routerLink: '/pages/labourSources/table', name: 'Labour Source', menuType: this.menuType },
    { routerLink: '/pages/labourTurnover/table', name: 'Labour Turnover', menuType: this.menuType },
    { routerLink: '/pages/leaveTypes/table', name: 'Leave Type', menuType: this.menuType },
    { routerLink: '/pages/loadingPlan/table', name: 'Loading Plan', menuType: this.menuType },
    { routerLink: '/pages/location/table', name: 'Location', menuType: this.menuType },
    { routerLink: '/pages/lossReason/table', name: 'Loss Reason', menuType: this.menuType },
    { routerLink: '/pages/lossTypes/table', name: 'Loss Type', menuType: this.menuType },
    { routerLink: '/pages/machines/table', name: 'Machine', menuType: this.menuType },
    { routerLink: '/pages/mailConfiguration/table', name: 'Mail Configuration ', menuType: this.menuType },
    { routerLink: '/pages/manpower', name: 'Manpower', menuType: this.menuType },
    { routerLink: '/pages/manpowerSummary/table', name: 'Manpower Summary', menuType: this.menuType },
    { routerLink: '/pages/manpowerTypes/table', name: 'Manpower Type', menuType: this.menuType },
    { routerLink: '/pages/manpowerUtilization/table', name: 'Manpower Utilization', menuType: this.menuType },
    { routerLink: '/pages/materialCostPerKg/table', name: 'Material Cost Per Kg', menuType: this.menuType },
    { routerLink: '/pages/notifyParties/table', name: 'Notify Party', menuType: this.menuType },
    { routerLink: '/pages/onTimeDelivery/table', name: 'On Time Delivery', menuType: this.menuType },
    { routerLink: '/pages/operation/table', name: 'Operation', menuType: this.menuType },
    { routerLink: '/pages/operationProgress/summary', name: 'Operation Progress Summary', menuType: this.menuType },
    { routerLink: '/pages/operationProgress/table', name: 'Operation Progress', menuType: this.menuType },
    { routerLink: '/pages/operationType/table', name: 'Operation Type', menuType: this.menuType },
    { routerLink: '/pages/orderInformation/table', name: 'Master Order Book', menuType: this.menuType },
    { routerLink: '/pages/organization/table', name: 'Organization', menuType: this.menuType },
    { routerLink: '/pages/packagingSpecification/table', name: 'Packaging Specification', menuType: this.menuType },
    { routerLink: '/pages/paints/table', name: 'Paint', menuType: this.menuType },
    { routerLink: '/pages/palletSize/table', name: 'Pallet Size', menuType: this.menuType },
    { routerLink: '/pages/paymentTerms/table', name: 'Payment Term', menuType: this.menuType },
    { routerLink: '/pages/permission/form', name: 'Permission', menuType: this.menuType },
    { routerLink: '/pages/plan', name: 'Plan', menuType: this.menuType },
    { routerLink: '/pages/ports/table', name: 'Port', menuType: this.menuType },
    { routerLink: '/pages/production/table', name: 'Production', menuType: this.menuType },
    { routerLink: '/pages/productionOverheadCostPerKg/table', name: 'Production Overhead Cost Per Kg', menuType: this.menuType },
    { routerLink: '/pages/productType/table', name: 'Product Type', menuType: this.menuType },
    { routerLink: '/pages/resourceUtilization/table', name: 'Resource Utilization', menuType: this.menuType },
    { routerLink: '/pages/rawMaterialItem/table', name: 'Raw Material Item', menuType: this.menuType },
    { routerLink: '/pages/salesOrder/table', name: 'Sales Order', menuType: this.menuType },
    { routerLink: '/pages/salesOrderTypes/table', name: 'Sales Order Type', menuType: this.menuType },
    { routerLink: '/pages/salesPerKg/table', name: 'Sales Per Kg', menuType: this.menuType },
    { routerLink: '/pages/salesValue/table', name: 'Sales Value', menuType: this.menuType },
    { routerLink: '/pages/salesWeight/table', name: 'Sales Weight', menuType: this.menuType },
    { routerLink: '/pages/scrap/table', name: 'Scrap', menuType: this.menuType },
    { routerLink: '/pages/scrapCostPerKg/table', name: 'Scrap Cost Per Kg', menuType: this.menuType },
    { routerLink: '/pages/section/table', name: 'Section', menuType: this.menuType },
    { routerLink: '/pages/sectionTypes/table', name: 'Section Type', menuType: this.menuType },
    { routerLink: '/pages/shiftRosters/table', name: 'Shift Roster', menuType: this.menuType },
    { routerLink: '/pages/shifts/table', name: 'Shift', menuType: this.menuType },
    { routerLink: '/pages/shiftTypes/table', name: 'Shift Type', menuType: this.menuType },
    { routerLink: '/pages/supplier/table', name: 'Supplier', menuType: this.menuType },
    { routerLink: '/pages/supplierTypes/table', name: 'Supplier Type', menuType: this.menuType },
    { routerLink: '/pages/teams/table', name: 'Team', menuType: this.menuType },
    { routerLink: '/pages/toolBreakdown/table', name: 'Tool Breakdown', menuType: this.menuType },
    { routerLink: '/pages/tools/table', name: 'Tool', menuType: this.menuType },
    { routerLink: '/pages/treatment/table', name: 'Treatment', menuType: this.menuType },
    { routerLink: '/pages/treatmentTypes/table', name: 'Treatment Type', menuType: this.menuType },
    { routerLink: '/pages/workCenter/table', name: 'Work Center', menuType: this.menuType }
  ];
  main;
  footer;
  mySidebar;
  openNav;

  ngAfterViewInit() {
    console.log(this.sharedService);
  }
  w3_toggle() {
    if (document.getElementById('mySidebar').style.display != 'none') {
      this.w3_close();
    } else {
      this.w3_open();
    }
  }
  w3_open() {
    this.main.style.marginLeft = '200px';
    this.footer.style.marginLeft = '200px';
    this.mySidebar.style.width = '200px';
    this.mySidebar.style.display = 'block';
  }
  w3_close() {
    this.main.style.marginLeft = '0%';
    this.footer.style.marginLeft = '0%';
    this.mySidebar.style.display = 'none';
  }

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
    this.menu = { name: '' }
  }
}
