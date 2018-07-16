import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { SubcontractorOperationService } from '../../subcontractorOperation.service';
import { SubcontractorService } from '../../../subcontractor/subcontractor.service';

@Component({
  selector: 'subcontractor-operation-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./subcontractorOperationTable.scss'],
  templateUrl: './subcontractorOperationTable.html'
})
export class SubcontractorOperationTable {
  subcontractorOperation = {};
  rows = [];
  timeout: any;
  totalRecords: number;
  subcontractors: any;
  subcontractor: any = { id: 0, code: 'ALL', display: 'All Subcontractors' };
  pageSize = 20;

  constructor(
    protected service: SubcontractorOperationService,
    private router: Router,
    private subcontractorService: SubcontractorService,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService
  ) {
    this.loadData();
    this.getSubcontractors();
  }

  getSubcontractors(): void {
    this.subcontractorService.getCombo().subscribe(subcontractors => {
      this.subcontractors = subcontractors;
      this.subcontractors.unshift({
        id: 0,
        code: 'ALL',
        display: 'All Subcontractors'
      });
    });
  }

  loadData() {
    if (
      (this.subcontractor !== undefined ? this.subcontractor.id : 0)
    ) {
      this.service
        .getSubcontractorOperation(0, 0, 20)
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

  lazy(event: any) {
    if (
      (this.subcontractor !== undefined ? this.subcontractor.id : 0
     )
    ) {
      this.service
        .getSubcontractorOperation(0, 0, 20)
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
      .getSubcontractorOperation(
        this.subcontractor !== undefined ? this.subcontractor.id : 0,
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
    this.router.navigate(['/pages/subcontractorOperation/form/' + data.id]);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/subcontractorOperation/form/' + id]);
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
  /*================== Subcontractor Filter ===================*/
  filteredSubcontractors: any[];
  filterSubcontractors(event) {
    let query = event.query.toLowerCase();
    this.filteredSubcontractors = [];
    for (let i = 0; i < this.subcontractors.length; i++) {
      let subcontractor = this.subcontractors[i];
      if (subcontractor.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredSubcontractors.push(subcontractor);
      }
    }
  }
  onSubcontractorSelect(subcontractor: any) {
    console.log(event);
    this.subcontractor = subcontractor;
  }
  /*================== Subcontractor Filter ===================*/
}
