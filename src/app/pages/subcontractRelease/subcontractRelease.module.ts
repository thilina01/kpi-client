import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MaterialModule } from '@angular/material';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule, AutoCompleteModule } from 'primeng/primeng';

import { SubcontractRelease } from './subcontractRelease.component';
import { SubcontractReleaseTable } from './components/subcontractReleaseTable/subcontractReleaseTable.component';
import { SubcontractReleaseForm } from './components/subcontractReleaseForm/subcontractReleaseForm.component';

import { routing } from './subcontractRelease.routing';
import { SubcontractReleaseService } from './subcontractRelease.service';
import { LocationService } from '../location/location.service';
import { SubcontractorService } from '../subcontractor/subcontractor.service';
import { SubcontractNoteService } from '../subcontractNote/subcontractNote.service';

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
    SubcontractRelease,
    SubcontractReleaseTable,
    SubcontractReleaseForm
  ],
  providers: [
    SubcontractReleaseService,
    LocationService,
    SubcontractorService,
    SubcontractNoteService

  ]
})
export class SubcontractReleaseModule { }
