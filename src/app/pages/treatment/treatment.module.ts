import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule, AutoCompleteModule } from 'primeng/primeng';

import { Treatment } from './treatment.component';
import { TreatmentTable } from './components/treatmentTable/treatmentTable.component';

import { routing } from './treatment.routing';
import { SectionService } from '../section/section.service';
import { TreatmentService } from './treatment.service';
import { ShiftService } from '../shift/shift.service';
import { TreatmentTypeService } from '../treatmentType/treatmentType.service';
import { MachineService } from '../machine/machine.service';
import { EmployeeService } from '../employee/employee.service';
import { AccidentTypeService } from '../accidentType/accidentType.service';
import { AccidentService } from '../accident/accident.service';

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
    DialogModule,
    routing
  ],
  declarations: [
    Treatment,
    TreatmentTable
  ],
  providers: [
    TreatmentService,
    TreatmentTypeService,
    AccidentService,
    AccidentTypeService,
    EmployeeService,
    SectionService,
    ShiftService,
    MachineService,
    TreatmentTypeService
  ]
})
export class TreatmentModule { }
