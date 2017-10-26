import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { EmployeeCategory } from './employeeCategory.component';
import { EmployeeCategoryTable } from './components/employeeCategoryTable/employeeCategoryTable.component';
import { EmployeeCategoryForm } from './components/employeeCategoryForm/employeeCategoryForm.component';

import { routing } from './employeeCategory.routing';
import { EmployeeCategoryService } from './employeeCategory.service';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    InputTextModule,
    CalendarModule,
    routing
  ],
  declarations: [
    EmployeeCategory,
    EmployeeCategoryTable,
    EmployeeCategoryForm
  ],
  providers: [
    EmployeeCategoryService
  ]
})
export class EmployeeCategoryModule { }
