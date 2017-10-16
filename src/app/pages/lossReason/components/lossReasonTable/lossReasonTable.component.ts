
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message, DataTable } from 'primeng/primeng';
import { Router } from '@angular/router';
import { LossReasonService } from '../../lossReason.service';
import { LossTypeService } from '../../../lossType/lossType.service';

@Component({
  selector: 'loss-reason-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./lossReasonTable.scss'],
  templateUrl: './lossReasonTable.html',
})

export class LossReasonTable {
  [x: string]: any;
  lossTypeList: any;
  filteredLossTypes: any[];
  lossTypes: any;
  rows = [];
  timeout: any;
  totalRecords: number;
  lossType: any = { id: 0, 'code': 'ALL', 'name': '' }
  @ViewChild(DataTable) dataTable: DataTable;

  constructor(protected service: LossReasonService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private lossTypeService: LossTypeService,
    private sharedService: SharedService) {
    this.getLossTypes();
    this.loadData()
  }

  getLossTypes(): void {
    this.lossTypeService.getCombo().subscribe(lossTypes => {
      this.lossTypes = lossTypes;
      this.lossTypes.unshift({ id: 0, 'code': 'ALL', 'name': '' });
    });
  }

  loadData() {
    if (this.lossType.id != undefined && this.lossType.id != 0) {
      this.service.getPageByLossType(this.lossType, 0, 20).subscribe((data: any) => {
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
    if (this.lossType.id != undefined && this.lossType.id != 0) {
      this.service.getPageByLossType(this.lossType, (event.first / event.rows), event.rows).subscribe((data: any) => {
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
    this.router.navigate(['/pages/lossReason/form/' + data.id]);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/lossReason/form/' + id]);
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

  /*================== LossType Filter ===================*/
  filterLossTypes(event) {
    let query = event.query.toLowerCase();
    this.filteredLossTypes = [];
    for (let i = 0; i < this.lossTypes.length; i++) {
      let lossType = this.lossTypes[i];
      if (lossType.code.toLowerCase().indexOf(query) == 0) {
        this.filteredLossTypes.push(lossType);
      }
    }
  }

  handleLossTypeDropdownClick() {
    this.filteredLossTypes = [];
    //mimic remote call
    setTimeout(() => {
      this.filteredLossTypes = this.lossTypes;
    }, 100)
  }

  onLossTypeSelect(lossType: any) {
    this.lossType = lossType;
    this.setDisplayOfLossType();
    this.loadData();
  }

  setDisplayOfLossType() {
    if (this.lossType != null && this.lossType != undefined) {
      let display = this.lossType.code != null && this.lossType.code != undefined ? this.lossType.code + ' : ' : '';
      display += this.lossType.name != null && this.lossType.name != undefined ? this.lossType.name : '';
      this.lossType.display = display;
    }
  }
  /*================== End Of LossType Filter ===================*/
}
