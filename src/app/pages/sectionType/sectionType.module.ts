import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { SectionType } from './sectionType.component';
import { SectionTypeTable } from './components/sectionTypeTable/sectionTypeTable.component';
import { SectionTypeForm } from './components/sectionTypeForm/sectionTypeForm.component';

import { routing } from './sectionType.routing';
import { SectionTypeService } from "./sectionType.service";


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
    SectionType,
    SectionTypeTable,
    SectionTypeForm
  ],
  providers: [
    SectionTypeService
  ]
})
export class SectionTypeModule { }
