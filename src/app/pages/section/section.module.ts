import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { Section } from './section.component';
import { SectionTypeService } from '../../services/sectionType.service';
import { SectionTable } from './components/sectionTable/sectionTable.component';
import { SectionForm } from './components/sectionForm/sectionForm.component';

import { routing } from './section.routing';
import { SectionService } from "./section.service";
import { WorkCenterService } from "../workCenter/workCenter.service";


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
    Section,
    SectionTable,
    SectionForm
  ],
  providers: [
    SectionService,
    SectionTypeService,
    WorkCenterService
  ]
})
export class SectionModule { }
