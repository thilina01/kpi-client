import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule, FileUploadModule } from 'primeng/primeng';

import { ProductType } from './productType.component';
import { ProductTypeTable } from './components/productTypeTable/productTypeTable.component';
import { ProductTypeForm } from './components/productTypeForm/productTypeForm.component';

import { routing } from './productType.routing';
import { ProductTypeService } from './productType.service';
import { ProductTypeImport } from './components/productTypeImport/productTypeImport.component';

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
    routing,
    FileUploadModule
    
  ],
  declarations: [
    ProductType,
    ProductTypeTable,
    ProductTypeForm,
    ProductTypeImport
    
  ],
  providers: [
    ProductTypeService
  ]
})
export class ProductTypeModule { }
