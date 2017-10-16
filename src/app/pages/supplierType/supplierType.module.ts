import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { SupplierType } from './supplierType.component';
import { SupplierTypeTable } from './components/supplierTypeTable/supplierTypeTable.component';
import { SupplierTypeForm } from './components/supplierTypeForm/supplierTypeForm.component';

import { routing } from './supplierType.routing';
import { SupplierTypeService } from './supplierType.service';

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
    SupplierType,
    SupplierTypeTable,
    SupplierTypeForm
  ],
  providers: [
    SupplierTypeService
  ]
})
export class SupplierTypeModule { }
