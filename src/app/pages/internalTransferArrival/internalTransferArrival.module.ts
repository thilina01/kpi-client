import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, CalendarModule, PanelModule, InputTextModule, AutoCompleteModule } from 'primeng/primeng';

import { InternalTransferArrival } from './internalTransferArrival.component';
import { InternalTransferArrivalTable } from './components/internalTransferArrivalTable/internalTransferArrivalTable.component';
import { InternalTransferArrivalForm } from './components/internalTransferArrivalForm/internalTransferArrivalForm.component';

import { routing } from './internalTransferArrival.routing';
import { InternalTransferArrivalService } from './internalTransferArrival.service';
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
    SharedModule,
    PanelModule,
    InputTextModule,
    AutoCompleteModule,
    routing
  ],
  declarations: [
    InternalTransferArrival,
    InternalTransferArrivalTable,
    InternalTransferArrivalForm
  ],
  providers: [
    InternalTransferArrivalService,
    LocationService,
    SubcontractorService,
    InternalTransferNoteService,
    SubcontractNoteService

  ]
})
export class InternalTransferArrivalModule { }
