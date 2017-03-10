import { JobService } from '../../services/job.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';

import { DataTableModule, SharedModule } from 'primeng/primeng';

import { Job } from './job.component';
import { routing } from './job.routing';
import { JobTable } from './components/jobTable/jobTable.component';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    DataTableModule,
    SharedModule,
    routing
  ],
  declarations: [
    Job,
    JobTable
  ],
  providers: [
    JobService,
  ]
})
export class JobModule { }
