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
  pageSize = 20;
  constructor(protected service: InvoiceService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private customerService: CustomerService,
    private sharedService: SharedService) {
    this.loadData();
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
    this.service
      .getCustomerAndInvoiceDateBetweenPage(0, '1970-01-01', '2100-12-31', 0, 20)
      .subscribe((data: any) => {
        this.search(0, 0);
      });
  }

  lazy(event: any, table: any) {
    console.log(event);
    this.search(event.first / event.rows, event.rows);
  }

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service.getCustomerAndInvoiceDateBetweenPage(
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
        this.rows = data.content;
        this.totalRecords = data.totalElements;
        this.fillTable(data);
      });
  }


  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.search(event.first, event.rows);
      console.log('paged!', event);
    }, 100);
  }

  fillTable(data: any) {
    let invoiceList = data.content;
    invoiceList.forEach(invoice => {
      let totalWeight = 0.0;
      let totalAmount = 0.0;
      let totalSalesAmount = 0.0;
      let  taxValue = 0.0;
      let containerSize = null;

      invoice.dispatchNoteList.forEach(dispatchNote => {
        dispatchNote.loadingPlanList.forEach(loadingPlan => {
          containerSize = loadingPlan.containerSize.name;
          loadingPlan.loadingPlanItemList.forEach(loadingPlanItem => {

            loadingPlanItem.weight = loadingPlanItem.invoiceQuantity * loadingPlanItem.dispatchSchedule.job.item.weight;
            totalWeight += loadingPlanItem.weight;

            if (loadingPlanItem.unitPrice === null || loadingPlanItem.unitPrice === undefined){
              loadingPlanItem.unitPrice = loadingPlanItem.dispatchSchedule.salesOrderItem.unitPrice;
            }
            loadingPlanItem.amount = loadingPlanItem.invoiceQuantity * loadingPlanItem.unitPrice;
              totalAmount += loadingPlanItem.amount;

          });
        });
      });
      invoice.totalWeight = totalWeight;
      invoice.totalAmount = totalAmount;
      invoice.totalSalesAmount = totalSalesAmount;
      invoice.totalSalesAmount = invoice.totalAmount * invoice.exchangeRate.exchangeRate;
      invoice.taxValue = taxValue;
      invoice.taxValue = invoice.totalSalesAmount * invoice.taxRate;
      invoice.containerSize = containerSize;

    });

    this.rows = invoiceList;
    this.totalRecords = data.totalElements;
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
