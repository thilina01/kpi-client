import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';

import { DataTableModule, PanelModule, SharedModule } from 'primeng/primeng';

import { Manpower } from './manpower.component';
import { ManpowerService } from '../../services/manpower.service';
import { ManpowerTable } from './components/manpowerTable/manpowerTable.component';

import { routing } from './manpower.routing';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    DataTableModule,
    SharedModule,
    PanelModule,
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
