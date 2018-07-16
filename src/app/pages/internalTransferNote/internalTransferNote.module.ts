import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule, AutoCompleteModule, InputTextModule, ContextMenuModule } from 'primeng/primeng';

import { InternalTransferNote } from './internalTransferNote.component';
import { InternalTransferNoteTable } from './components/internalTransferNoteTable/internalTransferNoteTable.component';
import { InternalTransferNoteForm } from './components/internalTransferNoteForm/internalTransferNoteForm.component';

import { routing } from './internalTransferNote.routing';
import { InternalTransferNoteService } from './internalTransferNote.service';
import { JobService } from '../job/job.service';
import { Print } from './components/internalTransferNotePrint/print.component';
import { PrintService } from '../../services/print.service';
import { ProductTypeService } from '../productType/productType.service';
import { SubcontractorService } from '../subcontractor/subcontractor.service';
import { LocationService } from '../location/location.service';

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
    InputTextModule,
    routing
  ],
  declarations: [
    InternalTransferNote,
    InternalTransferNoteTable,
    InternalTransferNoteForm,
    Print


  ],
  providers:
  [
    InternalTransferNoteService,
    JobService,
    ProductTypeService,
    SubcontractorService,
    LocationService,
    PrintService

  ]
})
export class InternalTransferNoteModule { }
