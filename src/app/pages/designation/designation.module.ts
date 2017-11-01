import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule, FileUploadModule } from 'primeng/primeng';

import { Designation } from './designation.component';
import { DesignationTable } from './components/designationTable/designationTable.component';
import { DesignationForm } from './components/designationForm/designationForm.component';

import { routing } from './designation.routing';
import { DesignationService } from './designation.service';
import { DesignationImport } from './components/designationImport/designationImport.component';

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
    Designation,
    DesignationTable,
    DesignationForm,
    DesignationImport
    
  ],
  providers: [
    DesignationService
  ]
})
export class DesignationModule { }
