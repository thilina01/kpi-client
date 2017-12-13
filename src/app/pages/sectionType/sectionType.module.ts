import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule, FileUploadModule } from 'primeng/primeng';

import { SectionType } from './sectionType.component';
import { SectionTypeTable } from './components/sectionTypeTable/sectionTypeTable.component';
import { SectionTypeForm } from './components/sectionTypeForm/sectionTypeForm.component';

import { routing } from './sectionType.routing';
import { SectionTypeService } from './sectionType.service';
import { SectionTypeImport } from './components/sectionTypeImport/sectionTypeImport.component';

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
    SectionType,
    SectionTypeTable,
    SectionTypeForm,
    SectionTypeImport
    
  ],
  providers: [
    SectionTypeService
  ]
})
export class SectionTypeModule { }
