import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { Application } from './application.component';
import { ApplicationTable } from './components/applicationTable/applicationTable.component';
import { ApplicationForm } from './components/applicationForm/applicationForm.component';

import { routing } from './application.routing';
import { ApplicationService } from './application.service';

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
    CalendarModule,
    routing
  ],
  declarations: [
    Application,
    ApplicationTable,
    ApplicationForm
  ],
  providers: [
    ApplicationService
  ]
})
export class ApplicationModule { }
