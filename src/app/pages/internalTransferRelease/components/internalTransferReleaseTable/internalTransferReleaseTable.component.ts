import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { DataTable } from 'primeng/components/datatable/datatable';
import { InternalTransferNoteService } from '../../../internalTransferNote/internalTransferNote.service';

@Component({
  selector: 'internal-transfer-release-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./internalTransferReleaseTable.scss'],
  templateUrl: './internalTransferReleaseTable.html'
})
export class InternalTransferReleaseTable {
  internalTransferRelease = {};
  rows = [];
  timeout: any;
  totalRecords: number;
  @ViewChild(DataTable) dataTable: DataTable;
  startDate: Date;
  endDate: Date;
  pageSize= 20;

  constructor(
    protected service: InternalTransferNoteService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService
  ) {
    this.loadData();
  }

  loadData() {
    this.service
      .getInternalTransferNoteRelease("1970-01-01", "2100-12-31", 0, 20)
      .subscribe((data: any) => {
        this.fillTable(data);
      });
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

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service
      .getInternalTransferNoteRelease(
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

  selected(data: any) {}

  onRowDblclick(data: any): void {
    window.open('/#/pages/internalTransferRelease/form/' + data.id, '_blank');
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/internalTransferRelease/form/' + id]);
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
}
