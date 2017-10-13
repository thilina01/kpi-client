import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';

import { DataTableModule, PanelModule, SharedModule, CalendarModule } from 'primeng/primeng';

import { Manpower } from './manpower.component';
import { ManpowerTable } from './components/manpowerTable/manpowerTable.component';

import { routing } from './manpower.routing';
import { ManpowerService } from './manpower.service';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    CalendarModule,
    routing
  ],
  declarations: [
    Manpower,
    ManpowerTable
  ],
  providers: [
    ManpowerService
  ]
})
export class ManpowerModule { }
