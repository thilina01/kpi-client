import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MaterialModule } from '@angular/material';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule, AutoCompleteModule, InputTextModule } from 'primeng/primeng';

import { LoadingPlan } from './loadingPlan.component';
import { LossTypeService } from '../../services/lossType.service';
import { LoadingPlanTable } from './components/loadingPlanTable/loadingPlanTable.component';
import { LoadingPlanForm } from './components/loadingPlanForm/loadingPlanForm.component';

import { routing } from './loadingPlan.routing';
import { LoadingPlanService } from './loadingPlan.service';
import { AddressService } from '../../services/address.service';
import { EmployeeService } from '../employee/employee.service';
import { DispatchScheduleService } from '../dispatchSchedule/dispatchSchedule.service';
import { CountryService } from '../country/country.service';
import { ContainerSizeService } from '../containerSize/containerSize.service';
import { PackagingSpecificationService } from '../packagingSpecification/packagingSpecification.service';
import { PortService } from '../port/port.service';
import { CustomerService } from '../customer/customer.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    // MaterialModule,
    SharedModule,
    PanelModule,
    AutoCompleteModule,
    InputTextModule,
    routing
  ],
  declarations: [
    LoadingPlan,
    LoadingPlanTable,
    LoadingPlanForm
  ],
  providers:
  [
    LoadingPlanService,
    AddressService,
    EmployeeService,
    DispatchScheduleService,
    PortService,
    CountryService,
    ContainerSizeService,
    CustomerService,
    PackagingSpecificationService
  ]
})
export class LoadingPlanModule { }
