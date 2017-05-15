import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule,PanelModule } from 'primeng/primeng';

import { Shift } from './shift.component';
import { ShiftService } from '../../services/shift.service';
import { ShiftTable } from './components/shiftTable/shiftTable.component';
import { ShiftForm } from './components/shiftForm/shiftForm.component';

import { routing } from './shift.routing';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
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
