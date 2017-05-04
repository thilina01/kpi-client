import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule,PanelModule } from 'primeng/primeng';

import { Section } from './section.component';
import { SectionService } from '../../services/section.service';
import { SectionTypeService } from '../../services/sectionType.service';
import { WorkCenterService } from '../../services/workCenter.service';
import { SectionTable } from './components/sectionTable/sectionTable.component';
import { SectionForm } from './components/sectionForm/sectionForm.component';

import { routing } from './section.routing';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
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
