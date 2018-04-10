import { SharedService } from "../../../../services/shared.service";
import { Component, ViewEncapsulation, Input } from "@angular/core";
import { Router } from "@angular/router";
import { PrintService } from "../../../../services/print.service";
import { ConfirmationService, Message, MenuItem } from "primeng/primeng";
import { LoadingPlanService } from "../../loadingPlan.service";

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
  dispatchNotePrint = 0;
  loadingPlanPrint = 0;
  packingListPrint= 0;
  palletLablePrint= 0;
  constructor(
    protected service: LoadingPlanService,
    private router: Router,
    private printService: PrintService,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService
  ) {
    this.loadData();
    this.items = [
      {label: 'Dispatch Note', icon: 'fa-print', command: (event) => {
        this.dispatchNotePrint = this.selectedLoadingPlan.id;
      }},
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

  loadData() {
    this.service.getPage(0, 20).subscribe((data: any) => {
      this.rows = data.content;
      this.totalRecords = data.totalElements;
    });
  }

  lazy(event: any, table: any) {
    const search = table.globalFilter ? table.globalFilter.value : null;
    this.service
      .getPage(event.first / event.rows, event.rows)
      .subscribe((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
      });
  }

  selected(data: any) {
    console.log(data);
  }

  // print(id: number) {
  //   this.loadingPlanId = id;
  // }

  // dispatchNotePrint(id: number) {
  //   this.loadingPlanId = id;
  // }

  // loadingPlanPrint(id: number) {
  //   this.loadingPlanId = id;
  // }

  // packingListPrint(id: number) {
  //   this.loadingPlanId = id;
  // }

  // palletLablePrint(id: number) {
  //   this.loadingPlanId = id;
  // }

  onRowDblclick(data: any): void {
    this.router.navigate(["/pages/loadingPlan/form/" + data.id]);
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

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log("paged!", event);
    }, 100);
  }
}
