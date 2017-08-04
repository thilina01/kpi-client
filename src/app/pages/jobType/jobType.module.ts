import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { JobType } from './jobType.component';
import { JobTypeService } from '../../services/jobType.service';
import { JobTypeTable } from './components/jobTypeTable/jobTypeTable.component';
import { JobTypeForm } from './components/jobTypeForm/jobTypeForm.component';

import { routing } from './jobType.routing';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    InputTextModule,
    routing
  ],
  declarations: [
    JobType,
    JobTypeTable,
    JobTypeForm
  ],
  providers: [
    JobTypeService
  ]
})
export class JobTypeModule { }
