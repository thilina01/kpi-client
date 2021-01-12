import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { ProductionService } from '../../production.service';
import { DataTable } from 'primeng/components/datatable/datatable';
import { SectionService } from '../../../section/section.service';
import { ShiftService } from '../../../shift/shift.service';
import { ControlPointTypeService } from '../../../controlPointType/controlPointType.service';

@Component({
  selector: 'production-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./productionTable.scss'],
  templateUrl: './productionTable.html'
})
export class ProductionTable {
  @ViewChild(DataTable) dataTable: DataTable;
  totalRecords: number;
  production = {};
  rows = [];
  timeout: any;
  sections: any;
  shifts: any;
  controlPointTypes: any;
  section: any = { id: 0, code: 'ALL', display: 'All' };
  controlPointType: any = { id: 0, code: 'ALL', display: 'All' };
  shift: any = { id: 0, code: 'ALL', display: 'All' };
  startDate: Date;
  endDate: Date;
  pageSize = 20;
  columns = [
    { prop: 'id', name: 'ID' },
    { prop: 'code', name: 'Code' },
    { prop: 'description', name: 'Description' },
    { prop: 'productionType.name', name: 'Type' }
  ];

  constructor(
    protected service: ProductionService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private sectionService: SectionService,
    private controlPointTypeService: ControlPointTypeService,
    private shiftService: ShiftService,
    private sharedService: SharedService
  ) {
    this.loadData();
    this.getSections();
    this.getShifts();
    this.getControlPointTypes();
  }

  getSections(): void {
    this.sectionService.getCombo().subscribe(sections => {
      this.sections = sections;
      this.sections.unshift({ id: 0, code: 'ALL', display: 'All Sections' });
    });
  }

  getShifts(): void {
    this.shiftService.getCombo().subscribe(shifts => {
      this.shifts = shifts;
      this.shifts.unshift({ id: 0, code: 'ALL', display: 'All Shifts' });
    });
  }

  getControlPointTypes(): void {
    this.controlPointTypeService.getCombo().subscribe(controlPointTypes => {
      this.controlPointTypes = controlPointTypes;
      this.controlPointTypes.unshift({
        id: 0,
        code: 'ALL',
        display: 'All ControlPointTypes'
      });
    });
  }

  loadData() {
    this.service
      .getControlPointTypeAndSectionAndShiftAndProductionDateBetweenPage(0, 0, '1970-01-01', '2100-12-31', 0, 0, 20)
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
      .getControlPointTypeAndSectionAndShiftAndProductionDateBetweenPage(
        this.section !== undefined ? this.section.id : 0,
        this.shift !== undefined ? this.shift.id : 0,
        this.startDate === undefined
          ? '1970-01-01'
          : this.sharedService.YYYYMMDD(this.startDate),
        this.endDate === undefined
          ? '2100-12-31'
          : this.sharedService.YYYYMMDD(this.endDate),
        this.controlPointType !== undefined ? this.controlPointType.id : 0,
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
    window.open('/#/pages/production/form/' + data.id, '_blank');
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
  navigateToForm(id: any): void {
    this.router.navigate(['/pages/plan']);
  }

  navigateToImport(): void {
    this.router.navigate(['/pages/production/import']);
  }

  /*================== Shift Filter ===================*/
  filteredShifts: any;

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
    console.log(event);
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
    console.log(event);
  }
  /*================== End Of Section Filter ===================*/
  /*================== Control Point Type Filter ===================*/
  filteredControlPointTypes: any;

  filterControlPointTypes(event) {
    let query = event.query.toLowerCase();
    this.filteredControlPointTypes = [];
    for (let i = 0; i < this.controlPointTypes.length; i++) {
      let controlPointType = this.controlPointTypes[i];
      if (controlPointType.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredControlPointTypes.push(controlPointType);
      }
    }
  }
  onControlPointTypeSelect(controlPointType: any) {
    console.log(event);
  }
  /*================== End Of Control Point Type Filter ===================*/
}
