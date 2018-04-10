import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { PrintService } from '../../../../services/print.service';
import { InvoiceService } from '../../invoice.service';
import { CustomerService } from '../../../customer/customer.service';

@Component({
  selector: 'invoice-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./invoiceTable.scss'],
  templateUrl: './invoiceTable.html'
})
export class InvoiceTable {
  startDate: Date = new Date();
  endDate: Date = new Date();
  invoiceId: number = 0;
  commercialInvoiceId = 0;
  suspendedInvoiceId = 0;
  taxInvoiceId = 0;
  totalRecords: number;
  customers: any;
  timeout: any;
  rows = [];
  customer: any = { id: 0, code: 'ALL', display: 'All Customers' };
  constructor(protected service: InvoiceService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private customerService: CustomerService,
    private sharedService: SharedService) {
    this.loadData();
    this.search(0, 0);
    this.getCustomers();
    this.startDate.setDate(1);
  }

  getCustomers(): void {
      this.customerService.getCombo().subscribe(customers => {
      this.customers = customers;
      this.customers.unshift({ id: 0, code: 'ALL', display: 'All Customers' });
    });
  }

  loadData() {
    this.service.getPage(0, 20).subscribe((data: any) => {
      this.rows = data.content;
      this.totalRecords = data.totalElements;
      this.search(0, 0);
    });
  }

  lazy(event: any, table: any) {
    console.log(event);
    this.search(event.first / event.rows, event.rows);
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.search(event.first, event.rows);
      console.log('paged!', event);
    }, 100);
  }

  search(first: number, pageSize: number): void {
    if (this.startDate !== undefined &&
       this.endDate !== undefined &&
      this.customer !== undefined &&
      this.customer.id !== undefined) {
      if (this.customer.id === 0) {
        this.service.getByInvoiceDurationPage(this.sharedService.YYYYMMDD(this.startDate),this.sharedService.YYYYMMDD(this.endDate),first,pageSize).subscribe((data: any) => {
            this.fillTable(data);
          });
      } else if (this.customer.id > 0) {
        this.service.getByCustomerAndInvoiceDurationPage(this.customer.id,this.sharedService.YYYYMMDD(this.startDate),this.sharedService.YYYYMMDD(this.endDate),first,pageSize).subscribe((data: any) => {
            this.fillTable(data);
          });

        } else if (this.customer.id > 0) {
          this.service.getByCustomerDurationPage(this.customer.id, first, pageSize).subscribe((data: any) => {
              this.fillTable(data);
            });
      }
    } else {
      this.service.getPage(first, pageSize).subscribe((data: any) => {
        this.fillTable(data);
      });
    }
  }

  fillTable(data: any) {
    this.rows = data.content;
    this.totalRecords = data.totalElements;
  }

  onRowDblclick(data: any): void {
    this.router.navigate(['/pages/invoice/form/' + data.id]);
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

  print(invoice: any) {
    //1 commercial
    //2 suspended
    //3 tax
    if (invoice.invoiceType.id === 1){
      this.commercialInvoiceId = invoice.id;
    }else if (invoice.invoiceType.id === 2){
      this.suspendedInvoiceId = invoice.id;
    }else if (invoice.invoiceType.id === 3){
      this.taxInvoiceId = invoice.id;
    }
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
