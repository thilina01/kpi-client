import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule, AutoCompleteModule } from 'primeng/primeng';

import { Accident } from './accident.component';
import { AccidentTable } from './components/accidentTable/accidentTable.component';
import { AccidentForm } from './components/accidentForm/accidentForm.component';

import { routing } from './accident.routing';
import { AccidentService } from "./accident.service";
import { AccidentTypeService } from "../accidentType/accidentType.service";
import { EmployeeService } from '../employee/employee.service';
import { SectionService } from '../section/section.service';
import { ShiftService } from '../shift/shift.service';
import { MachineService } from '../machine/machine.service';
import { TreatmentTypeService } from '../treatmentType/treatmentType.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    MaterialModule,
    SharedModule,
    PanelModule,
    InputTextModule,
    AutoCompleteModule,
    routing
  ],
  declarations: [
    Accident,
    AccidentTable,
    AccidentForm
  ],
  providers: [
    AccidentService,
    AccidentTypeService,
    EmployeeService,
    SectionService,
    ShiftService,
    MachineService,
    TreatmentTypeService
  ]
})
export class AccidentModule { }
