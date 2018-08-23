import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule, AutoCompleteModule, InputTextModule, ContextMenuModule, DropdownModule, ProgressBarModule, OverlayPanelModule, TabViewModule } from 'primeng/primeng';

import { SubcontractNote } from './subcontractNote.component';
import { SubcontractNoteTable } from './components/subcontractNoteTable/subcontractNoteTable.component';
import { SubcontractNoteForm } from './components/subcontractNoteForm/subcontractNoteForm.component';

import { routing } from './subcontractNote.routing';
import { SubcontractNoteService } from './subcontractNote.service';
import { SubcontractorService } from '../subcontractor/subcontractor.service';
import { JobService } from '../job/job.service';
import { SubcontractOperationRateService } from '../subcontractOperationRate/subcontractOperationRate.service';
import { SubcontractArrivalRejectService } from '../subcontractArrivalReject/subcontractArrivalReject.service';
import { SubcontractReworkNoteService } from '../../services/subcontractReworkNote.service';
import { PrintService } from '../../services/print.service';
import { SubcontractReworkNotePrint } from './components/subcontractReworkNotePrint';
import { SubcontractNotePrint } from './components/subcontractNotePrint/subcontractNotePrint.component';

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
    SharedModule,
    PanelModule,
    AutoCompleteModule,
    DropdownModule,
    ProgressBarModule,
    OverlayPanelModule,
    TabViewModule,
    InputTextModule,
    routing,
  ],
  declarations: [
    SubcontractNote,
    SubcontractNoteTable,
    SubcontractNoteForm,
    SubcontractReworkNotePrint,
    SubcontractNotePrint

  ],
  providers:
  [
    SubcontractNoteService,
    SubcontractorService,
    JobService,
    SubcontractOperationRateService,
    SubcontractArrivalRejectService,
    SubcontractReworkNoteService,
    PrintService

  ]
})
export class SubcontractNoteModule { }
