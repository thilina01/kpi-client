
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTable } from 'primeng/components/datatable/datatable';
import { ConfirmationService, Message } from 'primeng/primeng';
import { DispatchNoteService } from '../../dispatchNote.service';
import { PrintService } from '../../../../services/print.service';
import { CustomerService } from '../../../customer/customer.service';

@Component({
  selector: 'dispatch-note-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dispatchNoteTable.scss'],
  templateUrl: './dispatchNoteTable.html',
})
export class DispatchNoteTable {

  dispatchNote = {};
  rows = [];
  timeout: any;
  totalRecords: number;
  dispatchNoteId: number = 0;
  @ViewChild(DataTable) dataTable: DataTable;
  startDate: Date;
  endDate: Date;
  customers: any;
  customer: any = { id: 0, 'code': 'ALL', 'display': 'All Customers' }
  pageSize= 20;

  constructor(protected service: DispatchNoteService,
    private router: Router,
    private customerService: CustomerService,
    private confirmationService: ConfirmationService,
    private printService: PrintService,
    private sharedService: SharedService) {
    this.loadData();
    this.getCustomers();

  }
  getCustomers(): void {
    this.customerService.getCombo().subscribe(customers => {
      this.customers = customers;
      this.customers.unshift({ id: 0, 'code': 'ALL', 'display': 'All Customers' });
    });
  }

  loadData() {
    this.service
      .getDispatchNotePage(0, '1970-01-01', '2100-12-31', 0, 20)
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
      .getDispatchNotePage(
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
  }

  onRowDblclick(data: any): void {
    this.router.navigate(['/pages/dispatchNote/form/' + data.id]);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/dispatchNote/form/' + id]);
  }

  print(id: number) {
    this.dispatchNoteId = id;
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      accept: () => {
        this.service.delete(id).subscribe(response => {
          this.sharedService.addMessage({ severity: 'info', summary: 'Deleted', detail: 'Delete success' });
          this.loadData()
        }
        );
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

