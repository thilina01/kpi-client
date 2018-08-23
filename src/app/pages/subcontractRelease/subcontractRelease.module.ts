import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule, AutoCompleteModule,TabViewModule } from 'primeng/primeng';

import { SubcontractRelease } from './subcontractRelease.component';
import { SubcontractReleaseTable } from './components/subcontractReleaseTable/subcontractReleaseTable.component';
import { SubcontractReleaseForm } from './components/subcontractReleaseForm/subcontractReleaseForm.component';

import { routing } from './subcontractRelease.routing';
import { SubcontractReleaseService } from './subcontractRelease.service';
import { LocationService } from '../location/location.service';
import { SubcontractorService } from '../subcontractor/subcontractor.service';
import { SubcontractNoteService } from '../subcontractNote/subcontractNote.service';
import { SubcontractReworkNoteService } from '../../services/subcontractReworkNote.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    SharedModule,
    PanelModule,
    InputTextModule,
    TabViewModule,
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
    SubcontractNoteService,
    SubcontractReworkNoteService

  ]
})
export class SubcontractReleaseModule { }
