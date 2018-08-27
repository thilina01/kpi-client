import { SharedService } from "../../../../services/shared.service";
import { Component, ViewEncapsulation, Input } from "@angular/core";
import { Router } from "@angular/router";
import { PrintService } from "../../../../services/print.service";
import { ConfirmationService, Message, MenuItem } from "primeng/primeng";
import { LoadingPlanService } from "../../loadingPlan.service";
import { CustomerService } from '../../../customer/customer.service';

@Component({
  selector: "loading-plan-table",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./loadingPlanTable.scss"],
  templateUrl: "./loadingPlanTable.html"
})
export class LoadingPlanTable {
  loadingPlan = {};
  rows = [];
  timeout: any;
  totalRecords: number;
  loadingPlanId: number = 0;
  items: MenuItem[];
  selectedLoadingPlan: any;
  loadingPlanPrint = 0;
  packingListPrint= 0;
  palletLablePrint= 0;
  startDate: Date;
  endDate: Date;
  customers: any;
  customer: any = { id: 0, 'code': 'ALL', 'display': 'All Customers' }
  pageSize= 20;

  constructor(
    protected service: LoadingPlanService,
    private router: Router,
    private printService: PrintService,
    private customerService: CustomerService,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService
  ) {
    this.loadData();
    this.getCustomers();
    this.items = [

      {label: 'Loading Plan', icon: 'fa-print', command: (event) => {
        this.loadingPlanPrint = this.selectedLoadingPlan.id;
      }},

      {label: 'Packing List', icon: 'fa-print', command: (event) => {
        this.packingListPrint = this.selectedLoadingPlan.id;
      }},

      {label: 'Pallet Lable', icon: 'fa-print', command: (event) => {
        this.palletLablePrint = this.selectedLoadingPlan.id;
      }}
  ];
  }

  getCustomers(): void {
    this.customerService.getCombo().subscribe(customers => {
      this.customers = customers;
      this.customers.unshift({ id: 0, 'code': 'ALL', 'display': 'All Customers' });
    });
  }

  loadData() {
    this.service
      .getCustomerAndLoadingPlanDateBetweenPage(0, '1970-01-01', '2100-12-31', 0, 20)
      .subscribe((data: any) => {
        this.fillTable(data);
      });
  }

  lazy(event: any, table: any) {
    console.log(event);
    this.search(event.first / event.rows, event.rows);
  }

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service
      .getCustomerAndLoadingPlanDateBetweenPage(
        this.customer !== undefined ? this.customer.id : 0,
        this.startDate === undefined
          ? '1970-01-01'
          : this.sharedService.YYYYMMDD(this.startDate),
        this.endDate === undefined
          ? '2100-12-31'
          : this.sharedService.YYYYMMDD(this.endDate),
        first,
        pageSize
      )
      .subscribe((data: any) => {
        this.fillTable(data);
      });
  }


  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.search(event.first, event.rows);
    }, 100);
  }

  fillTable(data: any) {
    this.rows = data.content;
    this.totalRecords = data.totalElements;
  }


  selected(data: any) {
    console.log(data);
  }

  onRowDblclick(data: any): void {
    window.open('/#/pages/loadingPlan/form/' + data.id, '_blank');
  }

  navigateToForm(id: any): void {
    this.router.navigate(["/pages/loadingPlan/form/" + id]);
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to Delete?",
      accept: () => {
        this.service.delete(id).subscribe(response => {
          this.sharedService.addMessage({
            severity: "info",
            summary: "Deleted",
            detail: "Delete success"
          });
          this.loadData();
        });
      }
    });
  }

  /*================== Customer Filter ===================*/
  filteredCustomers: any[];
  filterCustomers(event) {
    let query = event.query.toLowerCase();
    this.filteredCustomers = [];
    for (let i = 0; i < this.customers.length; i++) {
      let customer = this.customers[i];
      if (customer.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredCustomers.push(customer);
      }
    }
  }
  onCustomerSelect(customer: any) {
    console.log(event)
  }
  /*================== End Of Customer Filter ===================*/
}
