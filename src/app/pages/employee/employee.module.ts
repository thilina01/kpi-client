import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { Employee } from './employee.component';
import { EmployeeTable } from './components/employeeTable/employeeTable.component';
import { EmployeeForm } from './components/employeeForm/employeeForm.component';
import { routing } from './employee.routing';
import { EmployeeService } from './employee.service';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    CalendarModule,
    SharedModule,
    PanelModule,
    InputTextModule,
    routing
  ],
  declarations: [
    Employee,
    EmployeeTable,
    EmployeeForm
  ],
  providers: [
    EmployeeService
  ]
})
export class EmployeeModule { }
