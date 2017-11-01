
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Observable } from 'rxjs/Rx';
import { SectionService } from '../../../section/section.service';
import { ManpowerUtilizationService } from '../../manpowerUtilization.service';
import { ShiftService } from '../../../shift/shift.service';
import { EmployeeService } from '../../../employee/employee.service';

@Component({
  selector: 'manpower-utilization-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./manpowerUtilizationTable.scss'],
  templateUrl: './manpowerUtilizationTable.html',
})

export class ManpowerUtilizationTable {
  rows = [];
  timeout: any;
  totalRecords: number;
  @ViewChild(DataTable) dataTable: DataTable;

  sections: any;
  employees: any;
  shifts: any;
  section: any = { id: 0, 'code': 'ALL', 'name': 'All Sections' }
  shift: any = { id: 0, 'code': 'ALL', 'name': 'All Shifts' }
  employee: any = { id: 0, 'code': 'ALL', 'name': 'All Employees' }
  startDate: Date;
  endDate: Date;

  constructor(protected service: ManpowerUtilizationService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService,
    private sectionService: SectionService,
    private employeeService: EmployeeService,
    private shiftService: ShiftService) {
    this.loadData()
    this.getSections();
    this.getShifts();
    this.getEmployees();
  }

  getSections(): void {
    this.sectionService.getCombo().subscribe(sections => {
      this.sections = sections;
      this.sections.unshift({ id: 0, 'code': 'ALL', 'name': 'All Sections' });
    });
  }

  getShifts(): void {
    this.shiftService.getCombo().subscribe(shifts => {
      this.shifts = shifts;
      this.shifts.unshift({ id: 0, 'code': 'ALL', 'name': 'All Shifts' });
    });
  }
  getEmployees(): void {
    this.employeeService.getCombo().subscribe(employees => {
      this.employees = employees;
      this.employees.unshift({ id: 0, 'code': 'ALL', 'name': 'All Employees' });
    });
  }

  loadData() {
    this.service.getPage(0, 20).subscribe((data: any) => {
      this.rows = data.content;
      this.totalRecords = data.totalElements;
    });
  }

  lazy(event: any, table: any) {
    console.log(event);
    this.search((event.first / event.rows), event.rows);
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.search(event.first, event.rows);
    }, 100);
  }

  search(first: number, pageSize: number): void {
    if (this.startDate != undefined &&
      this.endDate != undefined &&
      this.section != undefined &&
      this.section.id != undefined &&
      this.employee != undefined &&
      this.employee.id != undefined &&
      this.shift != undefined &&
      this.shift.id != undefined) {
      if (this.section.id == 0 && this.shift.id == 0 && this.employee.id == 0) {
        this.service.getByProductionDurationPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
          this.fillTable(data);
        });
      } else if (this.section.id == 0 && this.employee.id == 0 && this.shift.id > 0) {
        this.service.getByProductionDurationAndShiftPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), this.shift.id, first, pageSize).subscribe((data: any) => {
          this.fillTable(data);
        });

      } else if (this.section.id > 0 && this.shift.id == 0 && this.employee.id == 0) {
        this.service.getBySectionAndProductionDurationPage(this.section.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
          this.fillTable(data);
        });
      } else if (this.section.id == 0 && this.shift.id == 0 && this.employee.id > 0) {
        this.service.getByProductionDurationAndEmployeePage(this.employee.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
          this.fillTable(data);
        });
      } else {
        this.service.getBySectionAndEmployeeAndProductionDurationAndShiftPage(this.section.id, this.sharedService.YYYYMMDD(this.startDate), this.employee.id, this.sharedService.YYYYMMDD(this.endDate), this.shift.id, first, pageSize, ).subscribe((data: any) => {
          this.fillTable(data);
        });
      }
    } else {
      this.service.getPage(first, pageSize).subscribe((data: any) => {
        this.fillTable(data);
      });
    }
  }

  fillTable(data: any) {
    this.rows = data.content;
    this.totalRecords = data.totalElements;
  }

  /*================== Shift Filter ===================*/
  filteredShifts: any;
  filterShifts(event) {
    let query = event.query.toLowerCase();
    this.filteredShifts = [];
    for (let i = 0; i < this.shifts.length; i++) {
      let shift = this.shifts[i];
      if (shift.code.toLowerCase().indexOf(query) == 0) {
        this.filteredShifts.push(shift);
      }
    }
  }

  handleShiftDropdownClick() {
    this.filteredShifts = [];
    //mimic remote call
    setTimeout(() => {
      this.filteredShifts = this.shifts;
    }, 100)
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
      if (section.code.toLowerCase().indexOf(query) == 0) {
        this.filteredSections.push(section);
      }
    }
  }

  handleSectionDropdownClick() {
    this.filteredSections = [];
    //mimic remote call
    setTimeout(() => {
      this.filteredSections = this.sections;
    }, 100)
  }

  onSectionSelect(section: any) {
    console.log(event)
  }
  /*================== End Of Section Filter ===================*/
  /*================== Employee Filter ===================*/
  filteredEmployees: any;
  filterEmployees(event) {
    let query = event.query.toLowerCase();
    this.filteredEmployees = [];
    for (let i = 0; i < this.employees.length; i++) {
      let employee = this.employees[i];
      if (employee.code.toLowerCase().indexOf(query) == 0) {
        this.filteredEmployees.push(employee);
      }
    }
  }

  handleEmployeeDropdownClick() {
    this.filteredEmployees = [];
    //mimic remote call
    setTimeout(() => {
      this.filteredEmployees = this.employees;
    }, 100)
  }

  onEmployeeSelect(employee: any) {
    console.log(event)
  }
  /*================== End Of Employee Filter ===================*/

}



