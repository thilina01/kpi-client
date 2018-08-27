import { Router } from '@angular/router';
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input } from '@angular/core';
import { PrintService } from '../../../../services/print.service';
import { ConfirmationService, Message, MenuItem } from 'primeng/primeng';
import { SubcontractNoteService } from '../../subcontractNote.service';
import { SubcontractorService } from '../../../subcontractor/subcontractor.service';
import { SubcontractReworkNoteService } from '../../../../services/subcontractReworkNote.service';

@Component({
  selector: 'subcontract-note-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./subcontractNoteTable.scss'],
  templateUrl: './subcontractNoteTable.html'
})
export class SubcontractNoteTable {
  rows = [];
  timeout: any;
  endDate: Date;
  pageSize = 20;
  startDate: Date;
  subcontractors: any;
  subcontractNote = {};
  totalRecords: number;
  subcontractReworkNote = {};
  subcontractNoteId: number = 0;
  subcontractReworkNoteRows = [];
  subcontractReworkNoteId: number = 0;
  subcontractReworkNoteTotalRecords: number;
  subcontractor: any = { id: 0, code: 'ALL', display: 'All Subcontractors' };

  constructor(
    protected service: SubcontractNoteService,
    private router: Router,
    private printService: PrintService,
    private sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private subcontractorService: SubcontractorService,
    private subcontractReworkNoteService: SubcontractReworkNoteService,
  ) {
    this.loadData();
    this.getSubcontractors();
    this.subcontractReworkNoteLoadData();
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

  subcontractReworkNoteLoadData() {
    this.subcontractReworkNoteService
      .getSubcontractReworkNote(0, '1970-01-01', '2100-12-31', 0, 20)
      .subscribe((data: any) => {
      this.subcontractReworkNoteFillTable(data);
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
    this.search(event.first / event.rows, event.rows);
    this.subcontractReworkNoteSearch(
      event.first / event.subcontractReworkNoteRows,
      event.subcontractReworkNoteRows
    );
  }

  subcontractReworkNoteSearch(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.subcontractReworkNoteService
      .getSubcontractReworkNote(
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
        this.subcontractReworkNoteFillTable(data);
      });
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

  subcontractReworkNoteFillTable(data: any) {
    this.subcontractReworkNoteRows = data.content;
    this.subcontractReworkNoteTotalRecords = data.totalElements;
  }

  selected(data: any) {
    console.log(data);
  }

  subcontractNotePrint(id: number) {
    this.subcontractNoteId = id;
  }

  subcontractReWorkNotePrint(id: number) {
    this.subcontractReworkNoteId = id;
  }

  onRowDblclick(data: any): void {
    window.open('/#/pages/subcontractNote/form/' + data.id, '_blank');
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
