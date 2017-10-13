import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { ShiftType } from './shiftType.component';
import { ShiftTypeTable } from './components/shiftTypeTable/shiftTypeTable.component';
import { ShiftTypeForm } from './components/shiftTypeForm/shiftTypeForm.component';

import { routing } from './shiftType.routing';
import { ShiftTypeService } from './shiftType.service';


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
    ShiftType,
    ShiftTypeTable,
    ShiftTypeForm
  ],
  providers: [
    ShiftTypeService
  ]
})
export class ShiftTypeModule { }
