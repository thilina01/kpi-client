
import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Observable } from 'rxjs/Rx';
import { SectionService } from '../../../section/section.service';
import { TreatmentService } from '../../treatment.service';
import { ShiftService } from '../../../shift/shift.service';
import { AccidentService } from '../../../accident/accident.service';
import { EmployeeService } from '../../../employee/employee.service';

@Component({
  selector: 'treatment-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./treatmentTable.scss'],
  templateUrl: './treatmentTable.html',
})

export class TreatmentTable {
  rows = [];
  timeout: any;
  totalRecords: number;
  @ViewChild(DataTable) dataTable: DataTable;
  display: boolean = false;
  employees: any;
  employee: any = { id: 0, 'code': 'ALL', 'display': 'All Employees' }
  startDate: Date;
  endDate: Date;
  constructor(protected service: AccidentService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService,
    private employeeService: EmployeeService,
    private sectionService: SectionService,
    private accidentService: AccidentService,
    private shiftService: ShiftService) {
    this.loadData();
    this.getEmployees();
  }
  getEmployees(): void {
    this.employeeService.getCombo().subscribe(employees => {
      this.employees = employees;
      this.employees.unshift({ id: 0, 'code': 'ALL', 'display': 'All Employees' });
    });
  }

  lazy(event: any, table: any) {
    const search = table.globalFilter ? table.globalFilter.value : null;
    if (this.employee.id != undefined && this.employee.id != 0) {
      this.service.getPageByEmployee(this.employee, (event.first / event.rows), event.rows).subscribe((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
      });
    } else {
      this.service.getPage((event.first / event.rows), event.rows).subscribe((data: any) => {
        this.rows = data.content;
        this.totalRecords = data.totalElements;
        this.search((event.first / event.rows), event.rows);

      });
    }
  }

  loadData() {
    if (this.employee.id != undefined && this.employee.id != 0) {
      this.service.getPageByEmployee(this.employee, 0, 20).subscribe((data: any) => {
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

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.search(event.first, event.rows);
    }, 100);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/accident/form/']);
  }

  search(first: number, pageSize: number): void {
    if (this.startDate != undefined &&
      this.endDate != undefined &&
      this.employee != undefined &&
      this.employee.id != undefined) {
      if (this.employee.id == 0) {
        this.service.getByAccidentDurationPage(this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
          this.fillTable(data);
        });
      } else if (this.employee.id > 0) {
        this.service.getByEmployeeAndAccidentDurationPage(this.employee.id, this.sharedService.YYYYMMDD(this.startDate), this.sharedService.YYYYMMDD(this.endDate), first, pageSize).subscribe((data: any) => {
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

  onRowDblclick(data: any): void {
    this.showDialog();
  }

  showDialog() {
    this.display = true;
  }

  /*================== Employee Filter ===================*/
  filteredEmployees: any;
  filterEmployees(event) {
    let query = event.query.toLowerCase();
    this.filteredEmployees = [];
    for (let i = 0; i < this.employees.length; i++) {
      let employee = this.employees[i];
      if (employee.display.toLowerCase().indexOf(query) >= 0) {
        this.filteredEmployees.push(employee);
      }
    }
  }
  onEmployeeSelect(employee: any) {
    console.log(event)
    this.employee = employee;
    this.loadData();
  }
}

