
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { ExchangeRateService } from '../../exchangeRate.service';
import { CurrencyService } from '../../../currency/currency.service';

@Component({
  selector: 'customer-type-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./exchangeRateTable.scss'],
  templateUrl: './exchangeRateTable.html',
})

export class ExchangeRateTable {
  rows = [];
  timeout: any;
  totalRecords: number;
  endDate: Date = new Date();
  startDate: Date = new Date();
  currencyList: any;
  pageSize= 20;
  currency: any = { id: 0, 'code': 'ALL', 'display': 'All Currencies' };

  constructor(protected service: ExchangeRateService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private currencyService: CurrencyService,
    private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.loadData();
    this.getCurrencyList();
    this.startDate.setDate(this.endDate.getDate() - 7);
}

  getCurrencyList(): void {
    this.currencyService.getCombo().subscribe(currencyList => {
      this.currencyList = currencyList;
      this.currencyList.unshift({ id: 0, 'code': 'ALL', 'display': 'All Currencies' });
    });
  }

  loadData() {
    this.service.getPage(0, 20).subscribe((data: any) => {
      this.search(0, 0);
    });
  }

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service
      .getByCurrencyAndExchangeRateDateBetweenPage(
        this.currency !== undefined ? this.currency.id : 0,
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

  lazy(event: any, table: any) {
    console.log(event);
    this.search(event.first / event.rows, event.rows);
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  onRowDblclick(data: any): void {
    window.open('/#/pages/exchangeRate/form/' + data.id, '_blank');
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/exchangeRate/form/' + id]);
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      accept: () => {
        this.service.delete(id).subscribe(response => {
          this.sharedService.addMessage({ severity: 'info', summary: 'Deleted', detail: 'Delete success' });
          this.loadData();
        }
        );
      }
    });
  }

  /*================== Currency Filter ===================*/
  filteredCurrencyList: any[];

  filterCurrencyList(event) {
    let query = event.query.toLowerCase();
    this.filteredCurrencyList = [];
    for (let i = 0; i < this.currencyList.length; i++) {
      let currency = this.currencyList[i];
      if (currency.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredCurrencyList.push(currency);
      }
    }
  }
  onCurrencySelect(event: any) {}
  /*================== Currency Filter ===================*/
}
