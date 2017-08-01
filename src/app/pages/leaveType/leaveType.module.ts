import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule,PanelModule } from 'primeng/primeng';

import { LeaveType } from './leaveType.component';
import { LeaveTypeService } from '../../services/leaveType.service';
import { LeaveTypeTable } from './components/leaveTypeTable/leaveTypeTable.component';
import { LeaveTypeForm } from './components/leaveTypeForm/leaveTypeForm.component';

import { routing } from './leaveType.routing';


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
    LeaveType,
    LeaveTypeTable,
    LeaveTypeForm
  ],
  providers: [
    LeaveTypeService
  ]
})
export class LeaveTypeModule { }
