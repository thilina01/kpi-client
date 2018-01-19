import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule, AutoCompleteModule, DialogModule } from 'primeng/primeng';
import { PackingList } from './packingList.component';
import { PackingListTable } from './components/packingListTable/packingListTable.component';
import { PackingListForm } from './components/packingListForm/packingListForm.component';

import { routing } from './packingList.routing';
import { PackingListService } from './packingList.service';
import { MaterialModule } from '@angular/material';
import { DispatchService } from '../../services/dispatch.service';
import { PortService } from '../port/port.service';
import { ContainerSizeService } from '../containerSize/containerSize.service';
import { CountryService } from '../country/country.service';
import { DispatchNoteService } from '../dispatchNote/dispatchNote.service';
import { EmployeeService } from '../employee/employee.service';
import { AddressService } from '../../services/address.service';
import { CustomerService } from '../customer/customer.service';

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
    MaterialModule,
    DialogModule,
    AutoCompleteModule,
    routing
  ],
  declarations: [
    PackingList,
    PackingListTable,
    PackingListForm
  ],
  providers: [
    PackingListService,
    DispatchNoteService,
    PortService,
    ContainerSizeService,
    CountryService,
    DispatchNoteService,
    EmployeeService,
    DispatchService,
    AddressService,
    CustomerService
  ]

})
export class PackingListModule { }
