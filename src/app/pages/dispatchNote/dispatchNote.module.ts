import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule, AutoCompleteModule } from 'primeng/primeng';

import { DispatchNote } from './dispatchNote.component';
import { DispatchNoteTable } from './components/dispatchNoteTable/dispatchNoteTable.component';
import { DispatchNoteForm } from './components/dispatchNoteForm/dispatchNoteForm.component';

import { routing } from './dispatchNote.routing';
import { LabourSourceService } from '../labourSource/labourSource.service';
import { DispatchNoteService } from './dispatchNote.service';
import { DispatchScheduleService } from '../dispatchSchedule/dispatchSchedule.service';
import { EmployeeService } from '../employee/employee.service';
import { CustomerService } from '../customer/customer.service';
import { AddressService } from '../../services/address.service';
import { CustomerItemService } from '../customerItem/customerItem.service';
import { PrintService } from '../../services/print.service';
import { Print } from './components/dispatchNotePrint/print.component';
import { LossTypeService } from '../../services/lossType.service';

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
    DispatchNote,
    DispatchNoteTable,
    DispatchNoteForm,
    Print
  ],
  providers: [
    CustomerService,
    DispatchNoteService,
    AddressService,
    EmployeeService,
    PrintService,
    DispatchScheduleService
  ]
})
export class DispatchNoteModule { }
