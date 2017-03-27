import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule } from '@angular/forms';
import {MaterialModule} from '@angular/material';

import { CalendarModule, DropdownModule, DataTableModule, SharedModule } from 'primeng/primeng';

import { Chart } from './chart.component';
import { ItemService } from '../../services/item.service';
import { ChartService } from '../../services/chart.service';
import { SectionService } from '../../services/section.service';
import { ItemTable } from './components/itemTable/itemTable.component';
import { ScheduleAdherenceChart } from './components/scheduleAdherenceChart/scheduleAdherenceChart.component';

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
    routing
  ],
  declarations: [
    Chart,
    ItemTable,
    ScheduleAdherenceChart
  ],
  providers: [
    ItemService,
    ChartService,
    SectionService
  ]
})
export class ChartModule { }
