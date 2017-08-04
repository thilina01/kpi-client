import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { CustomerType } from './customerType.component';
import { CustomerTypeService } from '../../services/customerType.service';
import { CustomerTypeTable } from './components/customerTypeTable/customerTypeTable.component';
import { CustomerTypeForm } from './components/customerTypeForm/customerTypeForm.component';

import { routing } from './customerType.routing';


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
    CustomerType,
    CustomerTypeTable,
    CustomerTypeForm
  ],
  providers: [
    CustomerTypeService
  ]
})
export class CustomerTypeModule { }
