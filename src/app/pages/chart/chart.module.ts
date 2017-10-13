import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { CalendarModule, DropdownModule, DataTableModule, SharedModule, AutoCompleteModule, PanelModule } from 'primeng/primeng';

import { Chart } from './chart.component';


import { ScheduleAdherenceChart } from './components/scheduleAdherenceChart/scheduleAdherenceChart.component';
import { BreakdownChart } from './components/breakdownChart/breakdownChart.component';

import { routing } from './chart.routing';
import { ItemService } from '../item/item.service';
import { LossTypeService } from '../lossType/lossType.service';
import { SectionService } from '../section/section.service';
import { ChartService } from './chart.service';



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
    PanelModule,
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
