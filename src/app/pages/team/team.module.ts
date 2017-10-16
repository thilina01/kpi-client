import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { Team } from './team.component';
import { TeamTable } from './components/teamTable/teamTable.component';
import { TeamForm } from './components/teamForm/teamForm.component';

import { routing } from './team.routing';
import { TeamService } from './team.service';

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
    Team,
    TeamTable,
    TeamForm
  ],
  providers: [
    TeamService
  ]
})
export class TeamModule { }
