import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../services/shared.service';
import { ConfirmationService, Message } from 'primeng/primeng';
import { ManpowerService } from '../../manpower.service';
import { DataTable } from 'primeng/components/datatable/datatable';
import { ControlPointService } from '../../../controlPoint/controlPoint.service';
import { ShiftService } from '../../../shift/shift.service';
import { ManpowerTypeService } from '../../../manpowerType/manpowerType.service';

@Component({
  selector: 'manpower-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./manpowerTable.scss'],
  templateUrl: './manpowerTable.html'
})
export class ManpowerTable {
  manpower = {};
  rows = [];
  timeout: any;
  totalRecords: number;
  pageSize = 20;
  total = 0;
  startDate: Date;
  endDate: Date;
  @ViewChild(DataTable) dataTable: DataTable;
  shift: any = { id: 0, code: 'ALL', display: 'All Shifts' };
  controlPoint: any = { id: 0, code: 'ALL', display: 'All ControlPoints' };
  manpowerType: any = { id: 0, code: 'ALL', display: 'All ManpowerTypes' };
  controlPoints: any;
  shifts: any;
  manpowerTypes: any;

  constructor(
    protected service: ManpowerService,
    private router: Router,
    private controlPointService: ControlPointService,
    private shiftService: ShiftService,
    private manpowerTypeService: ManpowerTypeService,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService
  ) {
    this.loadData();
    this.getControlPoints();
    this.getShifts();
    this.getManpowerTypes();
  }

  getControlPoints(): void {
    this.controlPointService.getCombo().subscribe(controlPoints => {
      this.controlPoints = controlPoints;
      this.controlPoints.unshift({
        id: 0,
        code: 'ALL',
        display: 'All ControlPoints'
      });
    });
  }

  getShifts(): void {
    this.shiftService.getCombo().subscribe(shifts => {
      this.shifts = shifts;
      this.shifts.unshift({
        id: 0,
        code: 'ALL',
        display: 'All Shifts'
      });
    });
  }

  getManpowerTypes(): void {
    this.manpowerTypeService.getCombo().subscribe(manpowerTypes => {
      this.manpowerTypes = manpowerTypes;
      this.manpowerTypes.unshift({
        id: 0,
        code: 'ALL',
        display: 'All ManpowerTypes'
      });
    });
  }

  loadData() {
    this.service
      .getControlPointAndShiftAndManpowerTypeAndProductionDateBetweenPage(0, 0,0, '1970-01-01', '2100-12-31', 0, 20)
      .subscribe((data: any) => {
        this.fillTable(data);
      });
  }

  lazy(event: any, table: any) {
    console.log(event);
    this.search(event.first / event.rows, event.rows);
  }

  fillTable(data: any) {
    this.rows = data.content;
    this.totalRecords = data.totalElements;
  }

  search(first: number, pageSize: number): void {
    pageSize = pageSize === undefined ? this.pageSize : pageSize;
    this.service
      .getControlPointAndShiftAndManpowerTypeAndProductionDateBetweenPage(
        this.manpowerType !== undefined ? this.manpowerType.id : 0,
        this.controlPoint !== undefined ? this.controlPoint.id : 0,
        this.shift !== undefined ? this.shift.id : 0,
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

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  /*================== ControlPoint Filter ===================*/
  filteredControlPoints: any[];
  filterControlPoints(event) {
    let query = event.query.toLowerCase();
    this.filteredControlPoints = [];
    for (let i = 0; i < this.controlPoints.length; i++) {
      let controlPoint = this.controlPoints[i];
      if (controlPoint.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredControlPoints.push(controlPoint);
      }
    }
  }
  onControlPointSelect(controlPoint: any) {
    console.log(event);
  }
  /*================== End Of ControlPoint Filter ===================*/
  /*================== Shift Filter ===================*/
  filteredShifts: any[];
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
  /*================== ManpowerType Filter ===================*/
  filteredManpowerTypes: any[];
  filterManpowerTypes(event) {
    let query = event.query.toLowerCase();
    this.filteredManpowerTypes = [];
    for (let i = 0; i < this.manpowerTypes.length; i++) {
      let manpowerType = this.manpowerTypes[i];
      if (manpowerType.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredManpowerTypes.push(manpowerType);
      }
    }
  }
  onManpowerTypeSelect(manpowerType: any) {
    console.log(event);
  }
  /*================== End Of ManpowerType Filter ===================*/
}
