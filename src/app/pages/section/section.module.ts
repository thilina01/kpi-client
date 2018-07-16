import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { Section } from './section.component';
import { SectionTable } from './components/sectionTable/sectionTable.component';
import { SectionForm } from './components/sectionForm/sectionForm.component';

import { routing } from './section.routing';
import { SectionService } from './section.service';

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
    routing
  ],
  declarations: [
    Section,
    SectionTable,
    SectionForm
  ],
  providers: [
    SectionService
  ]
})
export class SectionModule { }
