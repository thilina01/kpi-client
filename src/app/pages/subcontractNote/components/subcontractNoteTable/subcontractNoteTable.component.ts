import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PrintService } from '../../../../services/print.service';
import { ConfirmationService, Message, MenuItem } from 'primeng/primeng';
import { SubcontractNoteService } from '../../subcontractNote.service';
import { SubcontractorService } from '../../../subcontractor/subcontractor.service';

@Component({
  selector: 'subcontract-note-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./subcontractNoteTable.scss'],
  templateUrl: './subcontractNoteTable.html'
})
export class SubcontractNoteTable {
  subcontractNote = {};
  rows = [];
  timeout: any;
  subcontractNoteId: number = 0;
  totalRecords: number;
  startDate: Date;
  endDate: Date;
  subcontractor: any = { id: 0, code: 'ALL', display: 'All Subcontractors' };
  subcontractors: any;
  pageSize = 20;
  constructor(
    protected service: SubcontractNoteService,
    private router: Router,
    private subcontractorService: SubcontractorService,
    private confirmationService: ConfirmationService,
    private printService: PrintService,
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
    this.service
      .getSubcontractNote(0, '1970-01-01', '2100-12-31', 0, 20)
      .subscribe((data: any) => {
        this.fillTable(data);
      });
  }

  lazy(event: any) {
    console.log(event);
    this.search(event.first / event.rows, event.rows);
  }

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service
      .getSubcontractNote(
        this.subcontractor !== undefined ? this.subcontractor.id : 0,
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

  selected(data: any) {
    console.log(data);
  }

  print(id: number) {
    this.subcontractNoteId = id;
  }

  onRowDblclick(data: any): void {
    this.router.navigate(['/pages/subcontractNote/form/' + data.id]);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/subcontractNote/form/' + id]);
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
