import { SharedService } from "../../../../services/shared.service";
import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { ConfirmationService, Message } from "primeng/primeng";
import { Router } from "@angular/router";
import { JobService } from "../../job.service";
import { DataTable } from "primeng/components/datatable/datatable";
import { ItemService } from "../../../item/item.service";

@Component({
  selector: "job-table",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./jobTable.scss"],
  templateUrl: "./jobTable.html"
})
export class JobTable {
  filteredItems: any[];
  items: any;
  filteredJobs: any[];
  rows = [];
  timeout: any;
  jobNo: any;
  totalRecords: number;
  pageSize = 20;
  @ViewChild(DataTable) dataTable: DataTable;
  item: any = { id: 0, code: "ALL", display: "All Items" };

  constructor(
    protected service: JobService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private itemService: ItemService,
    private sharedService: SharedService) {
    this.loadData();
    this.getItems();
  }

  loadData() {
    if (
      this.jobNo != undefined &&
      this.jobNo != 0 &&
      this.item != undefined &&
      this.item != 0
    ) {
      this.service.getItemPage(0, 0, 0, 20).subscribe((data: any) => {
        this.fillTable(data);
      });
    } else {
      this.service.getPage(0, 20).subscribe((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
      });
    }
  }

  lazy(event: any, table: any) {
    const search = table.globalFilter ? table.globalFilter.value : null;
    if (
      this.jobNo != undefined &&
      this.jobNo != 0 &&
      this.item != undefined &&
      this.item != 0
    ) {
      this.service.getItemPage(0, 0, 0, 20).subscribe((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
      });
    } else {
      this.service
        .getPage(event.first / event.rows, event.rows)
        .subscribe((data: any) => {
          this.rows = data.content;
          this.totalRecords = data.totalElements;
        });
    }
  }

  getItems(): void {
    this.itemService.getCombo().subscribe(items => {
      this.items = items;
      this.items.unshift({ id: 0, code: "ALL", display: "All Items" });
    });
  }

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service
      .getItemPage(
        this.jobNo !== undefined ? this.jobNo : 0,
        this.item !== undefined ? this.item.id : 0,
        first,
        pageSize
      )
      .subscribe((data: any) => {
        this.fillTable(data);
      });
  }

  fillTable(data: any) {
    this.rows = data.content;
    this.totalRecords = data.totalElements;
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log("paged!", event);
    }, 100);
  }

  onRowDblclick(data: any): void {
    this.router.navigate(["/pages/job/form/" + data.id]);
  }

  navigateToForm(id: any): void {
    this.router.navigate(["/pages/job/form/" + id]);
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

  /*================== Item Filter ===================*/
  filterItems(event) {
    let query = event.query.toLowerCase();
    this.filteredItems = [];
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      if (item.code.toLowerCase().indexOf(query) == 0) {
        this.filteredItems.push(item);
      }
    }
  }

  onItemSelect(item: any) {
    this.item = item;
  }

  /*================== End Of Item Filter ===================*/
}
