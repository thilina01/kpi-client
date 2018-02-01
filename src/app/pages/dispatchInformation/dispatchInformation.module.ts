import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule, AutoCompleteModule } from 'primeng/primeng';
import { DispatchInformation } from './dispatchInformation.component';
import { DispatchInformationTable } from './components/dispatchInformationTable/dispatchInformationTable.component';

import { routing } from './dispatchInformation.routing';
import { SectionService } from '../section/section.service';
import { DispatchInformationService } from './dispatchInformation.service';
import { ShiftService } from '../shift/shift.service';
import { EmployeeService } from '../employee/employee.service';
import { ProductionService } from '../production/production.service';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    CalendarModule,
    AutoCompleteModule,
    routing
  ],
  declarations: [
    DispatchInformation,
    DispatchInformationTable
  ],
  providers: [
    DispatchInformationService,
    SectionService,
    ShiftService,
    EmployeeService,
    ProductionService
  ]
})
export class DispatchInformationModule { }
