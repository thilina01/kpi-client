import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTable } from 'primeng/components/datatable/datatable';
import { ConfirmationService, Message } from 'primeng/primeng';
import { PrintService } from '../../../../services/print.service';
import { CustomerService } from '../../../customer/customer.service';
import { CreditNoteService } from '../creditNote/creditNote.service';

@Component({
  selector: 'credit-note-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./creditNoteTable.scss'],
  templateUrl: './creditNoteTable.html'
})
export class CreditNoteTable {
  creditNote = {};
  rows = [];
  creditNoteId = 0;
  suspendedCreditNoteId = 0;
  timeout: any;
  totalRecords: number;
  @ViewChild(DataTable)
  dataTable: DataTable;
  startDate: Date;
  endDate: Date;
  customers: any;
  customer: any = { id: 0, code: 'ALL', display: 'All Customers' };
  pageSize = 20;

  constructor(
    protected service: CreditNoteService,
    private router: Router,
    private customerService: CustomerService,
    private confirmationService: ConfirmationService,
    private printService: PrintService,
    private sharedService: SharedService
  ) {
    this.loadData();
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCombo().subscribe(customers => {
      this.customers = customers;
      this.customers.unshift({ id: 0, code: 'ALL', display: 'All Customers' });
    });
  }

  loadData() {
    this.service
      .getCreditNoteDetails('1970-01-01', '2100-12-31', 0, 20)
      .subscribe((data: any) => {
        this.search(0, 0);
      });
  }

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service.getCreditNoteDetails(
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
        this.rows = data.content;
        this.totalRecords = data.totalElements;
        this.fillTable(data);
      });
  }

  lazy(event: any, table: any) {
    console.log(event);
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {}, 100);
  }

  fillTable(data: any) {
    this.rows = data.content;
    this.totalRecords = data.totalElements;
  }

  selected(data: any) {}

  print(creditNote: any) {
    //6 creditNote
    //7 suspendedCreditNote

    if (creditNote.invoiceTypeId === 6) {
      this.creditNoteId = creditNote.id;
    } else if (creditNote.invoiceTypeId === 7) {
      this.suspendedCreditNoteId = creditNote.id;
    }
  }

  onRowDblclick(data: any): void {
    window.open('/#/pages/invoice/form/' + data.id, '_blank');
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/invoice/form/' + id]);
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
  }
  /*================== End Of Customer Filter ===================*/
}
