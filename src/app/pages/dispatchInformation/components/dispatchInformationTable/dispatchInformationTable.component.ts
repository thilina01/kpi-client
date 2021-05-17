import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { DataTable } from 'primeng/components/datatable/datatable';
import { CustomerService } from '../../../customer/customer.service';
import { ItemService } from '../../../item/item.service';
import { LoadingPlanItemService } from '../../../../services/loadingPlanItem.service';

@Component({
  selector: 'dispatch-information-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dispatchInformationTable.scss'],
  templateUrl: './dispatchInformationTable.html'
})
export class DispatchInformationTable {
  filteredItems: any[];
  filteredCustomers: any[];
  rows = [];
  timeout: any;
  totalRecords: number;
  customers: any;
  items: any;
  startDate: Date;
  endDate: Date;
  pageSize = 20;
  @ViewChild(DataTable)
  dataTable: DataTable;
  customer: any = { id: 0, code: 'ALL', display: 'All Customers' };
  item: any = { id: 0, code: 'ALL', display: 'All Items' };

  constructor(
    protected service: LoadingPlanItemService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private customerService: CustomerService,
    private itemService: ItemService,
    private sharedService: SharedService
  ) {
    this.loadData();
    this.getCustomers();
    this.getItems();
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

  loadData() {
    this.service
      .getDispatchInformationPage(0, 0, '1970-01-01', '2100-12-31', 0, 20)
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
      .getDispatchInformationPage(
        this.customer !== undefined ? this.customer.id : 0,
        this.item !== undefined ? this.item.id : 0,
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

  fillTable(data: any) {
    let loadingPlanItemList = data.content;
    loadingPlanItemList.forEach(loadingPlanItem => {
      loadingPlanItem.noOfpackages =
        loadingPlanItem.quantity /
        loadingPlanItem.packagingSpecification.perPalletQuantity;

      loadingPlanItem.dispatchSchedule.requestDate = this.sharedService.YYYYMMDD(loadingPlanItem.dispatchSchedule.requestDate);
      loadingPlanItem.dispatchSchedule.confirmDate = this.sharedService.YYYYMMDD(loadingPlanItem.dispatchSchedule.confirmDate);
      loadingPlanItem.loadingPlan.dispatchNote.dispatchDate = this.sharedService.YYYYMMDD(loadingPlanItem.loadingPlan.dispatchNote.dispatchDate);

    });
    this.rows = loadingPlanItemList;
    this.totalRecords = data.totalElements;
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  /*================== Customer Filter ===================*/
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
}
