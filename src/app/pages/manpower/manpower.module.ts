import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule, PanelModule, SharedModule, InputTextModule, AutoCompleteModule, DropdownModule, CalendarModule } from 'primeng/primeng';

import { Manpower } from './manpower.component';
import { ManpowerTable } from './components/manpowerTable/manpowerTable.component';

import { routing } from './manpower.routing';
import { ManpowerService } from './manpower.service';
import { ShiftService } from '../shift/shift.service';
import { ManpowerTypeService } from '../manpowerType/manpowerType.service';
import { ControlPointService } from '../controlPoint/controlPoint.service';
import { NgaModule } from '../../theme/nga.module';

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
    InputTextModule,
    routing
  ],
  declarations: [
    Manpower,
    ManpowerTable
  ],
  providers: [
    ManpowerService,
    ShiftService,
    ManpowerTypeService,
    ControlPointService
  ]
})
export class ManpowerModule { }
