import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { Scrap } from './scrap.component';
import { ScrapTable } from './components/scrapTable/scrapTable.component';
import { ScrapForm } from './components/scrapForm/scrapForm.component';

import { routing } from './scrap.routing';
import { ScrapService } from "./scrap.service";
import { JobService } from "../job/job.service";
import { SectionService } from "../section/section.service";
import { LossReasonService } from "../lossReason/lossReason.service";
import { CalendarModule } from "primeng/components/calendar/calendar";
import { AutoCompleteModule } from "primeng/components/autocomplete/autocomplete";
import { OperationTypeService } from "../operationType/operationType.service";
import { ProductTypeService } from "../productType/productType.service";



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
    Scrap,
    ScrapTable,
    ScrapForm
  ],
  providers: [
    ScrapService,
    JobService,
    ProductTypeService,
    OperationTypeService,
    SectionService,
    LossReasonService
  ]
})
export class ScrapModule { }
