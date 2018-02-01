import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MaterialModule } from '@angular/material';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule, AutoCompleteModule } from 'primeng/primeng';

import { ResourceUtilization } from './resourceUtilization.component';
import { ResourceUtilizationTable } from './components/resourceUtilizationTable/resourceUtilizationTable.component';
import { ResourceUtilizationForm } from './components/resourceUtilizationForm/resourceUtilizationForm.component';

import { routing } from './resourceUtilization.routing';
import { ResourceUtilizationService } from './resourceUtilization.service';
import { EmployeeService } from '../employee/employee.service';
import { ProductionService } from '../production/production.service';
import { MachineService } from '../machine/machine.service';
import { ShiftService } from '../shift/shift.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    // MaterialModule,
    SharedModule,
    PanelModule,
    InputTextModule,
    AutoCompleteModule,
    routing
  ],
  declarations: [
    ResourceUtilization,
    ResourceUtilizationTable,
    ResourceUtilizationForm
  ],
  providers: [
    ResourceUtilizationService,
    EmployeeService,
    ProductionService,
    MachineService,
    ShiftService
  ]
})
export class ResourceUtilizationModule { }
