import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { PackagingSpecificationService } from '../../packagingSpecification.service';
import { ItemService } from '../../../item/item.service';
import { PalletSizeService } from '../../../palletSize/palletSize.service';

@Component({
  selector: 'packaging-specification-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./packagingSpecificationTable.scss'],
  templateUrl: './packagingSpecificationTable.html'
})
export class PackagingSpecificationTable {
  packagingSpecification = {};
  rows = [];
  timeout: any;
  totalRecords: number;
  items: any;
  palletSizes: any;
  filteredItems: any[];
  palletSize: any = { id: 0, code: 'ALL', name: '', display: 'All' };
  item: any = { id: 0, code: 'ALL', display: 'All Items' };
  filteredPalletSizes: any[];
  pageSize = 20;

  constructor(
    protected service: PackagingSpecificationService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private itemService: ItemService,
    private palletSizeService: PalletSizeService,
    private sharedService: SharedService
  ) {
    this.loadData();
    this.getItems();
    this.getPalletSizes();
  }

  getItems(): void {
    this.itemService.getCombo().subscribe(items => {
      this.items = items;
      this.items.unshift({ id: 0, code: 'ALL', display: 'All Items' });
    });
  }

  getPalletSizes(): void {
    this.palletSizeService.getCombo().subscribe(palletSizes => {
      this.palletSizes = palletSizes;
      this.palletSizes.unshift({
        id: 0,
        code: 'ALL',
        display: 'All PalletSizes'
      });
    });
  }

  loadData() {
      this.service.getPage(0, 20).subscribe((data: any) => {
      this.fillTable(data);
      });
  }

  lazy(event: any, table: any) {
    if (this.palletSize !== undefined ? this.palletSize.id : 0, this.item !== undefined ? this.item.id : 0) {
      this.service.getPalletSizeAndItemPage(0, 0, 0, 20).subscribe((data: any) => {
        this.fillTable(data);
      });
    }
    else {
      this.service.getPage((event.first / event.rows), event.rows).subscribe((data: any) => {
        this.fillTable(data);
      });
    }
  }

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service
      .getPalletSizeAndItemPage(
        this.item !== undefined ? this.item.id : 0,
        this.palletSize !== undefined ? this.palletSize.id : 0,
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

  selected(data: any) {}

  onRowDblclick(data: any): void {
    this.router.navigate(['/pages/packagingSpecification/form/' + data.id]);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/packagingSpecification/form/' + id]);
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

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }
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
    this.item = item;
    console.log(event);
  }

  /*================== End Of Item Filter ===================*/
  /*================== PalletSize Filter ===================*/
  filterPalletSizes(event) {
    let query = event.query.toLowerCase();
    this.filteredPalletSizes = [];
    for (let i = 0; i < this.palletSizes.length; i++) {
      let palletSize = this.palletSizes[i];
      if (palletSize.code.toLowerCase().indexOf(query) == 0) {
        this.filteredPalletSizes.push(palletSize);
      }
    }
  }

  onPalletSizeSelect(palletSize: any) {
    this.palletSize = palletSize;
    console.log(event);
  }

  /*================== End Of PalletSize Filter ===================*/
}
