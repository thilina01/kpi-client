import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, AutoCompleteModule, PanelModule, ButtonModule, InputTextModule, TabViewModule, DataTableModule, SharedModule } from 'primeng/primeng';

import { MaterialModule } from '@angular/material';

import { Plan } from './plan.component';
import { routing } from './plan.routing';
import { PlanFormTop } from './components/planFormTop/planFormTop.component';
import { PlanFormJob } from './components/planFormJob/planFormJob.component';
import { PlanFormHr } from './components/planFormHr/planFormHr.component';
import { ProductionService } from "../production/production.service";



@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    CalendarModule,
    AutoCompleteModule,
    MaterialModule,
    InputTextModule,
    routing,
    FormsModule,
    PanelModule,
    TabViewModule,
    DataTableModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    Plan,
    PlanFormTop,
    PlanFormJob,
    PlanFormHr
  ],
  providers: [ProductionService]
})
export class PlanModule { }
