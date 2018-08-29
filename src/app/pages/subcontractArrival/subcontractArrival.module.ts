import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  DataTableModule,
  SharedModule,
  DialogModule,
  CalendarModule,
  PanelModule,
  InputTextModule,
  AutoCompleteModule
} from 'primeng/primeng';

import { SubcontractArrival } from './subcontractArrival.component';
import { SubcontractArrivalTable } from './components/subcontractArrivalTable/subcontractArrivalTable.component';
import { SubcontractArrivalForm } from './components/subcontractArrivalForm/subcontractArrivalForm.component';

import { routing } from './subcontractArrival.routing';
import { SubcontractArrivalService } from './subcontractArrival.service';
import { SubcontractOperationService } from '../../services/subcontractOperation.service';
import { SubcontractNoteService } from '../subcontractNote/subcontractNote.service';
import { SubcontractorService } from '../subcontractor/subcontractor.service';
import { JobService } from '../job/job.service';

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
    AutoCompleteModule,
    InputTextModule,
    routing
  ],
  declarations: [
    SubcontractArrival,
    SubcontractArrivalTable,
    SubcontractArrivalForm
  ],
  providers: [
    SubcontractArrivalService,
    SubcontractOperationService,
    SubcontractNoteService,
    SubcontractorService,
    JobService
  ]
})
export class SubcontractArrivalModule {}
