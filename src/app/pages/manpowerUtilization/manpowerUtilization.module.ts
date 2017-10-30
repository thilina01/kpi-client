import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule, AutoCompleteModule } from 'primeng/primeng';
import { ManpowerUtilization } from './manpowerUtilization.component';
import { ManpowerUtilizationTable } from './components/manpowerUtilizationTable/manpowerUtilizationTable.component';

import { routing } from './manpowerUtilization.routing';
import { SectionService } from '../section/section.service';
import { ManpowerUtilizationService } from './manpowerUtilization.service';
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
    ManpowerUtilization,
    ManpowerUtilizationTable
  ],
  providers: [
    ManpowerUtilizationService,
    SectionService,
    ShiftService,
    EmployeeService,
    ProductionService
  ]
})
export class ManpowerUtilizationModule { }
