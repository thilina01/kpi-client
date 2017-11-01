import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule, FileUploadModule } from 'primeng/primeng';

import { ComputerType } from './computerType.component';
import { ComputerTypeTable } from './components/computerTypeTable/computerTypeTable.component';
import { ComputerTypeForm } from './components/computerTypeForm/computerTypeForm.component';

import { routing } from './computerType.routing';
import { ComputerTypeService } from './computerType.service';
import { ComputerTypeImport } from './components/computerTypeImport/computerTypeImport.component';

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
    FileUploadModule,
    routing
  ],
  declarations: [
    ComputerType,
    ComputerTypeTable,
    ComputerTypeForm,
    ComputerTypeImport
    
  ],
  providers: [
    ComputerTypeService
  ]
})
export class ComputerTypeModule { }
