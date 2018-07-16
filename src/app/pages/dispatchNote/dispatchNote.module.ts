import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule, AutoCompleteModule } from 'primeng/primeng';

import { DispatchNote } from './dispatchNote.component';
import { DispatchNoteTable } from './components/dispatchNoteTable/dispatchNoteTable.component';
import { DispatchNoteForm } from './components/dispatchNoteForm/dispatchNoteForm.component';

import { routing } from './dispatchNote.routing';
import { DispatchNoteService } from './dispatchNote.service';
import { EmployeeService } from '../employee/employee.service';
import { CustomerService } from '../customer/customer.service';
import { AddressService } from '../../services/address.service';
import { PrintService } from '../../services/print.service';
import { Print } from './components/dispatchNotePrint/print.component';
import { LoadingPlanService } from '../loadingPlan/loadingPlan.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
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
    LoadingPlanService,
  ]
})
export class DispatchNoteModule { }
