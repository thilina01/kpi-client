import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, AutoCompleteModule, InputTextModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { Absenteeism } from './absenteeism.component';
import { AbsenteeismTable } from './components/absenteeismTable/absenteeismTable.component';
import { AbsenteeismForm } from './components/absenteeismForm/absenteeismForm.component';

import { routing } from './absenteeism.routing';
import { AbsenteeismService } from "./absenteeism.service";
import { LabourSourceService } from "../labourSource/labourSource.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    MaterialModule,
    SharedModule,
    PanelModule,
    AutoCompleteModule,
    routing
  ],
  declarations: [
    Absenteeism,
    AbsenteeismTable,
    AbsenteeismForm
  ],
  providers: [AbsenteeismService, LabourSourceService]
})
export class AbsenteeismModule { }
