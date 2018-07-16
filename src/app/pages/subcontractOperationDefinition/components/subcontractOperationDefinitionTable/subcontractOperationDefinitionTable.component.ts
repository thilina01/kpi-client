import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message, DataTable } from 'primeng/primeng';
import { Router } from '@angular/router';
import { SubcontractOperationDefinitionService } from '../../subcontractOperationDefinition.service';
import { ItemService } from '../../../item/item.service';
import { ProductTypeService } from '../../../productType/productType.service';
import { OperationTypeService } from '../../../operationType/operationType.service';

@Component({
  selector: 'subcontract-operation-definition-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./subcontractOperationDefinitionTable.scss'],
  templateUrl: './subcontractOperationDefinitionTable.html'
})
export class SubcontractOperationDefinitionTable {
  rows = [];
  timeout: any;
  totalRecords: number;
  item: any = { id: 0, code: 'ALL', display: 'All Items' };
  productType: any = { id: 0, code: 'ALL', display: 'All ProductTypes' };
  operationType: any = { id: 0, code: 'ALL', display: 'All OperationTypes' };
  items: any;
  productTypes: any;
  operationTypes: any;
  pageSize = 20;

  constructor(
    protected service: SubcontractOperationDefinitionService,
    private router: Router,
    private itemService: ItemService,
    private productTypeService: ProductTypeService,
    private operationTypeService: OperationTypeService,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService
  ) {
    this.loadData();
    this.getItems();
    this.getProductTypes();
    this.getOperationTypes();
  }

  getItems(): void {
    this.itemService.getCombo().subscribe(items => {
      this.items = items;
      this.items.unshift({
        id: 0,
        code: 'ALL',
        display: 'All Items'
      });
    });
  }

  getProductTypes(): void {
    this.productTypeService.getCombo().subscribe(productTypes => {
      this.productTypes = productTypes;
      this.productTypes.unshift({
        id: 0,
        code: 'ALL',
        display: 'All ProductTypes'
      });
    });
  }

  getOperationTypes(): void {
    this.operationTypeService.getCombo().subscribe(operationTypes => {
      this.operationTypes = operationTypes;
      this.operationTypes.unshift({
        id: 0,
        code: 'ALL',
        display: 'All OperationTypes'
      });
    });
  }

  loadData() {
    if (
      (this.item !== undefined ? this.item.id : 0,
      this.productType !== undefined ? this.productType.id : 0,
      this.operationType !== undefined ? this.operationType.id : 0)
    ) {
      this.service
        .getBySubcontractOperationDefinition(0, 0, 0, 0, 20)
        .subscribe((data: any) => {
          this.rows = data.content;
          this.totalRecords = data.totalElements;
        });
    } else {
      this.service.getPage(0, 20).subscribe((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
      });
    }
  }

  lazy(event: any, table: any) {
    if (
      (this.item !== undefined ? this.item.id : 0,
      this.productType !== undefined ? this.productType.id : 0,
      this.operationType !== undefined ? this.operationType.id : 0)
    ) {
      this.service
        .getBySubcontractOperationDefinition(0, 0, 0, 0, 20)
        .subscribe((data: any) => {
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

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service
      .getBySubcontractOperationDefinition(
        this.item !== undefined ? this.item.id : 0,
        this.productType !== undefined ? this.productType.id : 0,
        this.operationType !== undefined ? this.operationType.id : 0,
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
      console.log('paged!', event);
    }, 100);
  }

  onRowDblclick(data: any): void {
    this.router.navigate([
      '/pages/subcontractOperationDefinition/form/' + data.id
    ]);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/subcontractOperationDefinition/form/' + id]);
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
  /*================== OperationType Filter ===================*/
  filteredOperationTypes: any[];
  filterOperationTypes(event) {
    let query = event.query.toLowerCase();
    this.filteredOperationTypes = [];
    for (let i = 0; i < this.operationTypes.length; i++) {
      let operationType = this.operationTypes[i];
      if (operationType.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredOperationTypes.push(operationType);
      }
    }
  }
  onOperationTypeSelect(operationType: any) {
    console.log(event);
    this.operationType = operationType;
  }
  /*================== OperationType Filter ===================*/

  /*================== ProductType Filter ===================*/
  filteredProductTypes: any[];
  filterProductTypes(event) {
    let query = event.query.toLowerCase();
    this.filteredProductTypes = [];
    for (let i = 0; i < this.productTypes.length; i++) {
      let productType = this.productTypes[i];
      if (productType.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredProductTypes.push(productType);
      }
    }
  }
  onProductTypeSelect(productType: any) {
    console.log(event);
    this.productType = productType;
  }
  /*================== ProductType Filter ===================*/

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
  /*================== Item Filter ===================*/
}
