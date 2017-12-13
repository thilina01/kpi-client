import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule, FileUploadModule } from 'primeng/primeng';

import { AccidentType } from './accidentType.component';
import { AccidentTypeTable } from './components/accidentTypeTable/accidentTypeTable.component';
import { AccidentTypeForm } from './components/accidentTypeForm/accidentTypeForm.component';

import { routing } from './accidentType.routing';
import { AccidentTypeService } from './accidentType.service';
import { AccidentTypeImport } from './components/accidentTypeImport/accidentTypeImport.component';

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
    AccidentType,
    AccidentTypeTable,
    AccidentTypeForm,
    AccidentTypeImport
    
  ],
  providers: [
    AccidentTypeService
  ]
})
export class AccidentTypeModule { }
