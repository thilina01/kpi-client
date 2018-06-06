import { SharedService } from '../../../../services/shared.service';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Observable } from 'rxjs/Rx';
import { TreatmentService } from '../../treatment.service';
import { AccidentService } from '../../../accident/accident.service';
import { EmployeeService } from '../../../employee/employee.service';

@Component({
  selector: 'treatment-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./treatmentTable.scss'],
  templateUrl: './treatmentTable.html'
})
export class TreatmentTable {
  pageSize = 20;
  rows = [];
  timeout: any;
  totalRecords: number;
  @ViewChild(DataTable) dataTable: DataTable;
  display: boolean = false;
  employees: any;
  employee: any = { id: 0, code: 'ALL', display: 'All Employees' };
  startDate: Date;
  endDate: Date;
  constructor(
    protected service: AccidentService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService,
    private employeeService: EmployeeService,
    private accidentService: AccidentService
  ) {
    this.loadData();
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getCombo().subscribe(employees => {
      this.employees = employees;
      this.employees.unshift({ id: 0, code: 'ALL', display: 'All Employees' });
    });
  }

  loadData() {
    this.service
      .getTreatmentPage(0, '1970-01-01', '2100-12-31', 0, 20)
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
      .getTreatmentPage(
        this.employee !== undefined ? this.employee.id : 0,
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

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.search(event.first, event.rows);
    }, 100);
  }

  navigateToForm(id: any): void {
    this.router.navigate(['/pages/accident/form/']);
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
    console.log(event);
    this.employee = employee;
  }
  /*================== Employee Filter ===================*/
}
