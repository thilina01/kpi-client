import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, PanelModule, TabViewModule, CalendarModule, AutoCompleteModule, InputTextModule } from 'primeng/primeng';
import { Job } from './job.component';
import { JobTable } from './components/jobTable/jobTable.component';
import { JobForm } from './components/jobForm/jobForm.component';
import { JobInfo } from './components/jobInfo/jobInfo.component';

import { routing } from './job.routing';
import { ItemService } from "../item/item.service";
import { JobService } from "./job.service";
import { JobTypeService } from "../jobType/jobType.service";
import { OperationService } from "../operation/operation.service";


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    TabViewModule,
    CalendarModule,
    AutoCompleteModule,
    InputTextModule,
    routing
  ],
  declarations: [
    Job,
    JobTable,
    JobForm,
    JobInfo
  ],
  providers: [
    JobService,
    JobTypeService,
    ItemService,
    OperationService
  ]
})
export class JobModule { }
