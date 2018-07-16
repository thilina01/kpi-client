import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule, AutoCompleteModule } from 'primeng/primeng';

import { DispatchRelease } from './dispatchRelease.component';
import { DispatchReleaseTable } from './components/dispatchReleaseTable/dispatchReleaseTable.component';
import { DispatchReleaseForm } from './components/dispatchReleaseForm/dispatchReleaseForm.component';

import { routing } from './dispatchRelease.routing';
import { DispatchReleaseService } from './dispatchRelease.service';
import { DispatchScheduleService } from '../dispatchSchedule/dispatchSchedule.service';
import { EmployeeService } from '../employee/employee.service';
import { CustomerService } from '../customer/customer.service';
import { AddressService } from '../../services/address.service';
import { CustomerTypeService } from '../customerType/customerType.service';
import { DispatchNoteService } from '../dispatchNote/dispatchNote.service';
import { LocationService } from '../location/location.service';
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
    LoadingPlanService,
    LocationService
  ]
})
export class DispatchReleaseModule { }
