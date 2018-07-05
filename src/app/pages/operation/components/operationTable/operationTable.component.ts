
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Observable } from 'rxjs/Rx';
import { SectionService } from '../../../section/section.service';
import { OperationService } from '../../operation.service';
import { ShiftService } from '../../../shift/shift.service';

@Component({
  selector: 'operation-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./operationTable.scss'],
  templateUrl: './operationTable.html',
})

export class OperationTable {
  filteredShifts: any;
  rows = [];
  timeout: any;
  totalRecords: number;
  @ViewChild(DataTable) dataTable: DataTable;

  sections: any;
  section: any = { id: 0, 'code': 'ALL', 'display': 'All Sections' };
  shifts: any;
  shift: any = { id: 0, 'code': 'ALL', 'display': 'All Shifts' };

  startDate: Date;
  endDate: Date;
  selectedOpertion: any;
  display: boolean = false;
  pageSize = 20;

  constructor(protected service: OperationService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService,
    private sectionService: SectionService,
    private shiftService: ShiftService) {
    this.loadData()
    this.getSections();
    this.getShifts();
  }

  getSections(): void {
    this.sectionService.getCombo().subscribe(sections => {
      this.sections = sections;
      this.sections.unshift({ id: 0, 'code': 'ALL', 'display': 'All Sections' });
    });
  }

  getShifts(): void {
    this.shiftService.getCombo().subscribe(shifts => {
      this.shifts = shifts;
      this.shifts.unshift({ id: 0, 'code': 'ALL', 'display': 'All Shifts' });
    });
  }

  loadData() {
    this.service
      .getSectionAndShiftAndProductionDateBetweenPage(0 , '1970-01-01', '2100-12-31', 0, 0, 20)
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
      this.search(event.first, event.rows);
    }, 100);
  }

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service
      .getSectionAndShiftAndProductionDateBetweenPage(
        this.section !== undefined ? this.section.id : 0,
        this.startDate === undefined
          ? '1970-01-01'
          : this.sharedService.YYYYMMDD(this.startDate),
        this.endDate === undefined
          ? '2100-12-31'
          : this.sharedService.YYYYMMDD(this.endDate),
        this.shift !== undefined ? this.shift.id : 0,
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

  onRowDblclick(data: any): void {
    this.selectedOpertion = data;
    this.showDialog();
  }

  showDialog() {
    this.display = true;
  }

  /*================== Shift Filter ===================*/
  filterShifts(event) {
    let query = event.query.toLowerCase();
    this.filteredShifts = [];
    for (let i = 0; i < this.shifts.length; i++) {
      let shift = this.shifts[i];
      if (shift.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredShifts.push(shift);
      }
    }
  }
  onShiftSelect(shift: any) {
    console.log(event)
  }
  /*================== End Of Shift Filter ===================*/
  /*================== Section Filter ===================*/
  filteredSections: any[];
  filterSections(event) {
    let query = event.query.toLowerCase();
    this.filteredSections = [];
    for (let i = 0; i < this.sections.length; i++) {
      let section = this.sections[i];
      if (section.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredSections.push(section);
      }
    }
  }
  onSectionSelect(section: any) {
    console.log(event)
  }
  /*================== End Of Section Filter ===================*/
}
