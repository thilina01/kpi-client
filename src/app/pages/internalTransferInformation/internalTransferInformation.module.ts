import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule, AutoCompleteModule, InputTextModule } from 'primeng/primeng';
import { InternalTransferInformation } from './internalTransferInformation.component';
import { InternalTransferInformationTable } from './components/internalTransferInformationTable/internalTransferInformationTable.component';

import { routing } from './internalTransferInformation.routing';
import { JobService } from '../job/job.service';
import { InternalTransferInformationService } from './internalTransferInformation.service';
import { LocationService } from '../location/location.service';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    CalendarModule,
    AutoCompleteModule,
    InputTextModule,
    routing
  ],
  declarations: [
    InternalTransferInformation,
    InternalTransferInformationTable
  ],
  providers: [
    LocationService,
    JobService,
    InternalTransferInformationService
  ]
})
export class InternalTransferInformationModule { }
