import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { CalendarModule, DropdownModule, DataTableModule, SharedModule,AutoCompleteModule } from 'primeng/primeng';

import { Chart } from './chart.component';
import { ItemService } from '../../services/item.service';
import { ChartService } from '../../services/chart.service';
import { LossTypeService } from '../../services/lossType.service';
import { SectionService } from '../../services/section.service';
import { ScheduleAdherenceChart } from './components/scheduleAdherenceChart/scheduleAdherenceChart.component';
import { BreakdownChart } from './components/breakdownChart/breakdownChart.component';

import { routing } from './chart.routing';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    DataTableModule,
    CalendarModule,
    DropdownModule,
    SharedModule,
    MaterialModule,
    AutoCompleteModule,
    routing
  ],
  declarations: [
    Chart,
    ScheduleAdherenceChart,
    BreakdownChart
  ],
  providers: [
    ItemService,
    ChartService,
    SectionService,
    LossTypeService
  ]
})
export class ChartModule { }
