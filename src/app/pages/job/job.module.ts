import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, PanelModule, TabViewModule, CalendarModule } from 'primeng/primeng';
import { Job } from './job.component';
import { JobService } from '../../services/job.service';
import { JobTypeService } from '../../services/jobType.service';
import { ItemService } from '../../services/item.service';
import { OperationService } from '../../services/operation.service';
import { JobTable } from './components/jobTable/jobTable.component';
import { JobForm } from './components/jobForm/jobForm.component';
import { JobInfo } from './components/jobInfo/jobInfo.component';

import { routing } from './job.routing';


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
