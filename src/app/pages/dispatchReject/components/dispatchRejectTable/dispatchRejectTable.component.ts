import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { DataTable } from 'primeng/components/datatable/datatable';
import { ItemService } from '../../../item/item.service';
import { DispatchNoteService } from '../../../dispatchNote/dispatchNote.service';
import { CustomerService } from '../../../customer/customer.service';
import { LoadingPlanItemService } from '../../../../services/loadingPlanItem.service';

@Component({
  selector: 'dispatch-reject-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dispatchRejectTable.scss'],
  templateUrl: './dispatchRejectTable.html'
})
export class DispatchRejectTable {
  dispatchReject = {};
  dispatchNotes: any;
  items: any;
  customers: any;
  rejectedQuantity: any;
  totalRecords: number;
  rows = [];
  timeout: any;
  startDate: Date;
  endDate: Date;
  pageSize = 20;
  dispatchNote: any = { id: 0, code: 'ALL', display: 'All DispatchNotes' };
  customer: any = { id: 0, code: 'ALL', display: 'All Customers' };
  item: any = { id: 0, code: 'ALL', display: 'All Items' };

  constructor(
    protected service: LoadingPlanItemService,
    private router: Router,
    private itemService: ItemService,
    private dispatchNoteService: DispatchNoteService,
    private customerService: CustomerService,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService
  ) {
    this.loadData();
    this.getCustomers();
    this.getItems();
    this.getDispatchNotes();
  }

  getCustomers(): void {
    this.customerService.getCombo().subscribe(customers => {
      this.customers = customers;
      this.customers.unshift({ id: 0, code: 'ALL', display: 'All Customers' });
    });
  }

  getItems(): void {
    this.itemService.getCombo().subscribe(items => {
      this.items = items;
      this.items.unshift({ id: 0, code: 'ALL', display: 'All Items' });
    });
  }

  getDispatchNotes(): void {
    this.dispatchNoteService.getCombo().subscribe(dispatchNotes => {
      this.dispatchNotes = dispatchNotes;
      this.dispatchNotes.unshift({
        id: 0,
        code: 'ALL',
        display: 'All DispatchNotes'
      });
    });
  }

  loadData() {
    this.service
      .getDispatchRejectPage(0, 0, 0, '1970-01-01', '2100-12-31', 0, 20)
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
      .getDispatchRejectPage(
        this.customer !== undefined ? this.customer.id : 0,
        this.item !== undefined ? this.item.id : 0,
        this.dispatchNote !== undefined ? this.dispatchNote.id : 0,
        // this.rejectedQuantity !== undefined ? this.rejectedQuantity : 0,
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

  fillTable(data: any) {
    this.rows = data.content;
    this.totalRecords = data.totalElements;
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.search(event.first, event.rows);
    }, 100);
  }

  selected(data: any) {}

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/dispatchReject/form/' + id]);
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      accept: () => {
        this.service.delete(id).subscribe(response => {
          this.sharedService.addMessage({
            severity: 'info',
            summary: 'Deleted',
            detail: 'Delete success'
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
    console.log(event);
    this.customer = customer;
  }

  /*================== End Of Customer Filter ===================*/
  /*================== Item Filter ===================*/
  filteredItems: any[];
  filterItems(event) {
    let query = event.query.toLowerCase();
    this.filteredItems = [];
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      if (item.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredItems.push(item);
      }
    }
  }

  onItemSelect(item: any) {
    console.log(event);
    this.item = item;
  }

  /*================== End Of Item Filter ===================*/
  /*================== DispatchNote Filter ===================*/
  filteredDispatchNotes: any[];
  filterDispatchNotes(event) {
    let query = event.query.toLowerCase();
    this.filteredDispatchNotes = [];
    for (let i = 0; i < this.dispatchNotes.length; i++) {
      let dispatchNote = this.dispatchNotes[i];
      if (dispatchNote.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredDispatchNotes.push(dispatchNote);
      }
    }
  }

  onDispatchNoteSelect(dispatchNote: any) {
    console.log(event);
    this.dispatchNote = dispatchNote;
  }

  /*================== End Of DispatchNote Filter ===================*/
}
