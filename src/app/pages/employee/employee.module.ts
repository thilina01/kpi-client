import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule,PanelModule } from 'primeng/primeng';

import { Employee } from './employee.component';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeTable } from './components/employeeTable/employeeTable.component';
import { EmployeeForm } from './components/employeeForm/employeeForm.component';

import { routing } from './employee.routing';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
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
