import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule, AutoCompleteModule, FileUploadModule } from 'primeng/primeng';

import { Employee } from './employee.component';
import { EmployeeTable } from './components/employeeTable/employeeTable.component';
import { EmployeeForm } from './components/employeeForm/employeeForm.component';
import { routing } from './employee.routing';
import { EmployeeService } from './employee.service';
import { EmployeeCategoryService } from '../employeeCategory/employeeCategory.service';
import { ShiftService } from '../shift/shift.service';
import { LabourSourceService } from '../labourSource/labourSource.service';
import { SectionService } from '../section/section.service';
import { DesignationService } from '../designation/designation.service';
import { EmployeeImport } from './components/employeeImport/employeeImport.component';

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
    FileUploadModule,
    AutoCompleteModule,
    routing
  ],
  declarations: [
    Employee,
    EmployeeTable,
    EmployeeImport,
    EmployeeForm
  ],
  providers: [
    EmployeeService,
    SectionService,
    LabourSourceService,
    ShiftService,
    EmployeeCategoryService,
    DesignationService
  ]
})
export class EmployeeModule { }
