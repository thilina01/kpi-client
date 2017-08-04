import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { ShiftType } from './shiftType.component';
import { ShiftTypeService } from '../../services/shiftType.service';
import { ShiftTypeTable } from './components/shiftTypeTable/shiftTypeTable.component';
import { ShiftTypeForm } from './components/shiftTypeForm/shiftTypeForm.component';

import { routing } from './shiftType.routing';


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
