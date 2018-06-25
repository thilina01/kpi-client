import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MaterialModule } from '@angular/material';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule, AutoCompleteModule, InputTextModule, ContextMenuModule } from 'primeng/primeng';

import { SubcontractNote } from './subcontractNote.component';
import { SubcontractNoteTable } from './components/subcontractNoteTable/subcontractNoteTable.component';
import { SubcontractNoteForm } from './components/subcontractNoteForm/subcontractNoteForm.component';

import { routing } from './subcontractNote.routing';
import { SubcontractNoteService } from './subcontractNote.service';
import { SubcontractorService } from '../subcontractor/subcontractor.service';
import { JobService } from '../job/job.service';
import { SubcontractOperationRateService } from '../subcontractOperationRate/subcontractOperationRate.service';
import { Print } from './components/subcontractNotePrint/print.component';
import { PrintService } from '../../services/print.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    ContextMenuModule,
    // MaterialModule,
    SharedModule,
    PanelModule,
    AutoCompleteModule,
    InputTextModule,
    routing
  ],
  declarations: [
    SubcontractNote,
    SubcontractNoteTable,
    SubcontractNoteForm,
    Print


  ],
  providers:
  [
    SubcontractNoteService,
    SubcontractorService,
    JobService,
    SubcontractOperationRateService,
    PrintService

  ]
})
export class SubcontractNoteModule { }
