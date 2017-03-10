import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule,AutoCompleteModule } from 'primeng/primeng';

import { MaterialModule } from '@angular/material';

import { Plan } from './plan.component';
import { routing } from './plan.routing';
import { PlanFormTop } from './components/planFormTop/planFormTop.component';
import { PlanFormJob } from './components/planFormJob/planFormJob.component';
import { PlanFormHr } from './components/planFormHr/planFormHr.component';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    CalendarModule,
    AutoCompleteModule,
    MaterialModule.forRoot(),
    routing,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    Plan,
    PlanFormTop,
    PlanFormJob,
    PlanFormHr
  ]
})
export class PlanModule { }
