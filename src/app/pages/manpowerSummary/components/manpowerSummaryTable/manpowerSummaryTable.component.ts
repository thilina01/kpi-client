
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { DataTable } from 'primeng/components/datatable/datatable';
import { SectionService } from '../../../section/section.service';
import { ResourceUtilizationService } from '../../../resourceUtilization/resourceUtilization.service';
import { ChartService } from '../../../chart/chart.service';
import {ShiftService} from "../../../shift/shift.service";

@Component({
  selector: 'manpower-summary-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./manpowerSummaryTable.scss'],
  templateUrl: './manpowerSummaryTable.html',
})

export class ManpowerSummaryTable {
  rows = [];
  timeout: any;
  totalRecords: number;
  @ViewChild(DataTable) dataTable: DataTable;
  sections: any;
  section: any = { id: 0, 'code': 'ALL', 'display': 'All Sections' }
  shifts: any;
  shift: any = { id: 0, 'code': 'ALL', 'display': 'All Shifts' }
  startDate: Date = new Date();
  endDate: Date = new Date();
  total = 0;
  chartOptions = {
    legend: {
      display: false
    }
  };
  Math: any;
  constructor(protected service: ResourceUtilizationService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private chartService: ChartService,
    private sharedService: SharedService,
    private sectionService: SectionService,
    private shiftService: ShiftService) {
    this.startDate.setHours(0, 0, 0, 0);
    this.endDate.setHours(24, 0, 0, 0);
    this.getSections();
    this.getShifts();
    this.search();
    this.Math = Math;
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

  search(): void {
    if (this.startDate !== undefined &&
      this.endDate !== undefined &&
      this.section !== undefined &&
      this.shift !== undefined &&
      this.section.id !== undefined &&
      this.shift.id !== undefined) {
      if (this.section.id === 0 && this.shift.id === 0) {
        this.chartService.getManpowerSummary(this.startDate.getTime(), this.endDate.getTime()).subscribe((data: any) => {
          this.fillTable(data);
        });
      } else if (this.section.id > 0 && this.shift.id === 0) {
        this.chartService.getManpowerSummaryBySection(this.startDate.getTime(), this.endDate.getTime(), this.section.id).subscribe((data: any) => {
          this.fillTable(data);
        });
      } else if (this.shift.id > 0 && this.section.id === 0) {
        this.chartService.getManpowerSummaryByShift(this.startDate.getTime(), this.endDate.getTime(), this.shift.id).subscribe((data: any) => {
          this.fillTable(data);
        });
      } else if (this.shift.id > 0 && this.section.id > 0) {
        this.chartService.getManpowerSummaryBySectionAndShift(this.startDate.getTime(), this.endDate.getTime(), this.section.id, this.shift.id).subscribe((data: any) => {
          this.fillTable(data);
        });
      }
    } else {
    }
  }

  fillTable(data: any) {
    this.total = 0;

    data.forEach(element => {
      element.code = element.controlPoint !== null ? element.controlPoint.code : element.section.code;
      this.total += element.count;
    });

    data.forEach(element => {
      element.chartData = {
        labels: [element.code, 'Other'],

        datasets: [
          {
            data: [element.count, (this.total - element.count)],
            backgroundColor: [
              "#FF6384",
              "#000000"
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#000000"
            ],
            options: {
              legend: {
                display: false
              }
            },
          }]
      };
    });
    this.rows = data;
  }

  fillBySection(row: any, op: any, event: any) {
    if (row.section !== null) {
      this.section = row.section;
      this.search();
    }
  }

  fillAllSections(op: any, event: any) {
      this.section = { id: 0, 'code': 'ALL', 'display': 'All Sections' };
      this.search();
  }

  selectedRow: any;
  showInfo(row: any, op: any, event: any) {
    this.selectedRow = row;
    if (this.section.code === 'ALL') {
      this.chartService.getResourceUtilizationDistinctEmployeeBySectionAndStartTimeBetween(row.section.id, this.startDate.getTime(), this.endDate.getTime()).subscribe((data: any) => {
        this.selectedRow.employeeList = data;
        console.log(this.selectedRow);
        op.show(event);
      });
    } else {
      this.chartService.getResourceUtilizationDistinctEmployeeByControlPointAndStartTimeBetween(row.controlPoint.id, this.startDate.getTime(), this.endDate.getTime()).subscribe((data: any) => {
        this.selectedRow.employeeList = data;
        console.log(this.selectedRow);
        op.show(event);
      });
    }
  }

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
    this.search();
  }
  /*================== End Of Section Filter ===================*/

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
    this.search();
  }
  /*================== End Of Shift Filter ===================*/

}



