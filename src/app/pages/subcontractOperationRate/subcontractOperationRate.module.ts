import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, AutoCompleteModule, CalendarModule } from 'primeng/primeng';

import { SubcontractOperationRate } from './subcontractOperationRate.component';
import { SubcontractOperationRateTable } from './components/subcontractOperationRateTable/subcontractOperationRateTable.component';
import { SubcontractOperationRateForm } from './components/subcontractOperationRateForm/subcontractOperationRateForm.component';

import { routing } from './subcontractOperationRate.routing';
import { SubcontractOperationRateService } from './subcontractOperationRate.service';
import { SubcontractorOperationService } from '../subcontractorOperation/subcontractorOperation.service';
import { SubcontractOperationDefinitionService } from '../subcontractOperationDefinition/subcontractOperationDefinition.service';
import { SubcontractorService } from '../subcontractor/subcontractor.service';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    AutoCompleteModule,
    InputTextModule,
    CalendarModule,
    routing
  ],
  declarations: [
    SubcontractOperationRate,
    SubcontractOperationRateTable,
    SubcontractOperationRateForm
  ],
  providers: [
    SubcontractOperationRateService,
    SubcontractorOperationService,
    SubcontractOperationDefinitionService,
    SubcontractorService

  ]
})
export class SubcontractOperationRateModule { }
