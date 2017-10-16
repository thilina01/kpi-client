import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule, AutoCompleteModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

import { DispatchRelease } from './dispatchRelease.component';
import { LossTypeService } from '../../services/lossType.service';
import { DispatchReleaseTable } from './components/dispatchReleaseTable/dispatchReleaseTable.component';
import { DispatchReleaseForm } from './components/dispatchReleaseForm/dispatchReleaseForm.component';

import { routing } from './dispatchRelease.routing';
import { LabourSourceService } from '../labourSource/labourSource.service';
import { DispatchReleaseService } from './dispatchRelease.service';

import { DispatchScheduleService } from '../dispatchSchedule/dispatchSchedule.service';
import { EmployeeService } from '../employee/employee.service';
import { CustomerService } from '../customer/customer.service';
import { AddressService } from '../../services/address.service';
import { CustomerItemService } from '../customerItem/customerItem.service';
import { DispatchService } from '../../services/dispatch.service';
import { CustomerTypeService } from '../customerType/customerType.service';
import { DispatchNoteService } from '../dispatchNote/dispatchNote.service';

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
    DispatchRelease,
    DispatchReleaseTable,
    DispatchReleaseForm
  ],
  providers: [
    CustomerService,
    DispatchReleaseService,
    AddressService,
    EmployeeService,
    DispatchScheduleService,
    CustomerTypeService,
    DispatchNoteService,
    DispatchService
  ]
})
export class DispatchReleaseModule { }
