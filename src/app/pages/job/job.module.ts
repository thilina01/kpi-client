import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, DialogModule, PanelModule, CalendarModule } from 'primeng/primeng';

import { Job } from './job.component';
import { JobService } from '../../services/job.service';
import { JobTypeService } from '../../services/jobType.service';
import { ItemService } from '../../services/item.service';
import { JobTable } from './components/jobTable/jobTable.component';
import { JobForm } from './components/jobForm/jobForm.component';

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
    CalendarModule,
    routing
  ],
  declarations: [
    Job,
    JobTable,
    JobForm
  ],
  providers: [
    JobService,
    JobTypeService,
    ItemService
  ]
})
export class JobModule { }
