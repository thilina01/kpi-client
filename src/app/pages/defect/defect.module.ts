import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { Defect } from './defect.component';
import { DefectTable } from './components/defectTable/defectTable.component';
import { DefectForm } from './components/defectForm/defectForm.component';

import { routing } from './defect.routing';
import { DefectService } from './defect.service';
import { JobService } from '../job/job.service';
import { SectionService } from '../section/section.service';
import { LossReasonService } from '../lossReason/lossReason.service';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { OperationTypeService } from '../operationType/operationType.service';
import { ItemTypeService } from '../itemType/itemType.service';

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
    Defect,
    DefectTable,
    DefectForm
  ],
  providers: [
    DefectService,
    JobService,
    ItemTypeService,
    OperationTypeService,
    SectionService,
    LossReasonService
  ]
})
export class DefectModule { }
