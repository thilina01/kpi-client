import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule, AutoCompleteModule } from 'primeng/primeng';

import { Computer } from './computer.component';

import { ComputerTable } from './components/computerTable/computerTable.component';
import { ComputerForm } from './components/computerForm/computerForm.component';

import { routing } from './computer.routing';
import { ComputerService } from './computer.service';
import { EmployeeService } from '../employee/employee.service';
import { ComputerTypeService } from '../computerType/computerType.service';



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
    AutoCompleteModule,    
    routing
  ],
  declarations: [
    Computer,
    ComputerTable,
    ComputerForm
  ],
  providers: [
    ComputerService,
    EmployeeService,
    ComputerTypeService
  ]
})
export class ComputerModule { }
