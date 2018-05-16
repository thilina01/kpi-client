
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message, DataTable } from 'primeng/primeng';
import { Router } from '@angular/router';
import { ItemService } from '../../item.service';
import { ItemTypeService } from '../../../itemType/itemType.service';

@Component({
  selector: 'item-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./itemTable.scss'],
  templateUrl: './itemTable.html',
})

export class ItemTable {
  rows = [];
  timeout: any;
  totalRecords: number;
  itemTypes: any;
  @ViewChild(DataTable) dataTable: DataTable;
  itemType: any = { id: 0, 'code': 'ALL', 'display': 'All ItemTypes'};

  constructor(protected service: ItemService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private itemTypeService: ItemTypeService,
    private sharedService: SharedService) {
    this.loadData();
    this.getItemTypes();

  }

  getItemTypes(): void {
    this.itemTypeService.getCombo().subscribe(itemTypes => {
        this.itemTypes = itemTypes;
        this.itemTypes.unshift({ id: 0, 'code': 'ALL', 'display': 'All ItemTypes' });
    });
  }


  loadData() {
    if (this.itemType.id != undefined && this.itemType.id != 0) {
      this.service.getPageByItemType(this.itemType, 0, 20).subscribe((data: any) => {
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
    const search = table.globalFilter ? table.globalFilter.value : null;
    if (this.itemType.id != undefined && this.itemType.id != 0) {
      this.service.getPageByItemType(this.itemType, (event.first / event.rows), event.rows).subscribe((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
      });
    } else {
      this.service.getPage((event.first / event.rows), event.rows).subscribe((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
      });
    }
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  onRowDblclick(data: any): void {
    this.router.navigate(['/pages/item/form/' + data.id]);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/item/form/' + id]);
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

  /*================== ItemType Filter ===================*/
 filteredItemTypes: any[];
 filterItemTypes(event) {
     let query = event.query.toLowerCase();
     this.filteredItemTypes = [];
     for (let i = 0; i < this.itemTypes.length; i++) {
         let itemType = this.itemTypes[i];
         if (itemType.display.toLowerCase().indexOf(query) >= 0) {
             this.filteredItemTypes.push(itemType);
         }
     }
 }
 onItemTypeSelect(itemType: any) {
     this.itemType = itemType;
     this.loadData();
 }
/*================== End of ItemType Filter ===================*/
}
