import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { Shift } from './shift.component';
import { ShiftTable } from './components/shiftTable/shiftTable.component';
import { ShiftForm } from './components/shiftForm/shiftForm.component';

import { routing } from './shift.routing';
import { ShiftService } from "./shift.service";


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
    CalendarModule,
    routing
  ],
  declarations: [
    Shift,
    ShiftTable,
    ShiftForm
  ],
  providers: [
    ShiftService
  ]
})
export class ShiftModule { }
