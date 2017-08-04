import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule,PanelModule,InputTextModule } from 'primeng/primeng';

import { Department } from './department.component';
import { DepartmentService } from '../../services/department.service';
import { DepartmentTable } from './components/departmentTable/departmentTable.component';
import { DepartmentForm } from './components/departmentForm/departmentForm.component';

import { routing } from './department.routing';


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
    routing
  ],
  declarations: [
    Department,
    DepartmentTable,
    DepartmentForm
  ],
  providers: [
    DepartmentService
  ]
})
export class DepartmentModule { }
