import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule, FileUploadModule } from 'primeng/primeng';

import { AddressType } from './addressType.component';
import { AddressTypeTable } from './components/addressTypeTable/addressTypeTable.component';
import { AddressTypeForm } from './components/addressTypeForm/addressTypeForm.component';

import { routing } from './addressType.routing';
import { AddressTypeService } from './addressType.service';
import { AddressTypeImport } from './components/addressTypeImport/addressTypeImport.component';

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
    AddressType,
    AddressTypeTable,
    AddressTypeForm,
    AddressTypeImport
    
  ],
  providers: [
    AddressTypeService
  ]
})
export class AddressTypeModule { }
