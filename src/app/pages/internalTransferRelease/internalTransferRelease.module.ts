import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MaterialModule } from '@angular/material';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule, AutoCompleteModule } from 'primeng/primeng';

import { InternalTransferRelease } from './internalTransferRelease.component';
import { InternalTransferReleaseTable } from './components/internalTransferReleaseTable/internalTransferReleaseTable.component';
import { InternalTransferReleaseForm } from './components/internalTransferReleaseForm/internalTransferReleaseForm.component';

import { routing } from './internalTransferRelease.routing';
import { InternalTransferReleaseService } from './internalTransferRelease.service';
import { LocationService } from '../location/location.service';
import { SubcontractorService } from '../subcontractor/subcontractor.service';
import { SubcontractNoteService } from '../subcontractNote/subcontractNote.service';
import { InternalTransferNoteService } from '../internalTransferNote/internalTransferNote.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    // MaterialModule,
    SharedModule,
    PanelModule,
    InputTextModule,
    AutoCompleteModule,
    routing
  ],
  declarations: [
    InternalTransferRelease,
    InternalTransferReleaseTable,
    InternalTransferReleaseForm
  ],
  providers: [
    InternalTransferReleaseService,
    LocationService,
    SubcontractorService,
    InternalTransferNoteService,
    SubcontractNoteService

  ]
})
export class InternalTransferReleaseModule { }
