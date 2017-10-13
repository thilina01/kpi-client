import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { CustomerType } from './customerType.component';

import { CustomerTypeTable } from './components/customerTypeTable/customerTypeTable.component';
import { CustomerTypeForm } from './components/customerTypeForm/customerTypeForm.component';

import { routing } from './customerType.routing';
import { CustomerTypeService } from './customerType.service';


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
    routing
  ],
  declarations: [
    CustomerType,
    CustomerTypeTable,
    CustomerTypeForm
  ],
  providers: [
    CustomerTypeService
  ]
})
export class CustomerTypeModule { }
