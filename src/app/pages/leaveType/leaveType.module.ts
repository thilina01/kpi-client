import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { LeaveType } from './leaveType.component';
import { LeaveTypeTable } from './components/leaveTypeTable/leaveTypeTable.component';
import { LeaveTypeForm } from './components/leaveTypeForm/leaveTypeForm.component';

import { routing } from './leaveType.routing';
import { LeaveTypeService } from "./leaveType.service";


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
    LeaveType,
    LeaveTypeTable,
    LeaveTypeForm
  ],
  providers: [
    LeaveTypeService
  ]
})
export class LeaveTypeModule { }
