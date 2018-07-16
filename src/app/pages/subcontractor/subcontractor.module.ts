import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, AutoCompleteModule, InputTextModule } from 'primeng/primeng';

import { Subcontractor } from './subcontractor.component';
import { SubcontractorTable } from './components/subcontractorTable/subcontractorTable.component';
import { SubcontractorForm } from './components/subcontractorForm/subcontractorForm.component';

import { routing } from './subcontractor.routing';
import { SubcontractorService } from './subcontractor.service';
import { LabourSourceService } from '../labourSource/labourSource.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    SharedModule,
    PanelModule,
    AutoCompleteModule,
    routing
  ],
  declarations: [
    Subcontractor,
    SubcontractorTable,
    SubcontractorForm
  ],
  providers: [SubcontractorService, LabourSourceService]
})
export class SubcontractorModule { }
