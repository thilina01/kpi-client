import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { ProductType } from './productType.component';
import { ProductTypeTable } from './components/productTypeTable/productTypeTable.component';
import { ProductTypeForm } from './components/productTypeForm/productTypeForm.component';

import { routing } from './productType.routing';
import { ProductTypeService } from './productType.service';


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
    ProductType,
    ProductTypeTable,
    ProductTypeForm
  ],
  providers: [
    ProductTypeService
  ]
})
export class ProductTypeModule { }
