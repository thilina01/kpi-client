import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule, FileUploadModule } from 'primeng/primeng';

import { TreatmentType } from './treatmentType.component';
import { TreatmentTypeTable } from './components/treatmentTypeTable/treatmentTypeTable.component';
import { TreatmentTypeForm } from './components/treatmentTypeForm/treatmentTypeForm.component';

import { routing } from './treatmentType.routing';
import { TreatmentTypeService } from './treatmentType.service';
import { TreatmentTypeImport } from './components/treatmentTypeImport/treatmentTypeImport.component';

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
    TreatmentType,
    TreatmentTypeTable,
    TreatmentTypeForm,
    TreatmentTypeImport
    
  ],
  providers: [
    TreatmentTypeService
  ]
})
export class TreatmentTypeModule { }
