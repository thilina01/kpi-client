import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule } from 'primeng/primeng';

import { Team } from './team.component';
import { TeamService } from '../../services/team.service';
import { TeamTable } from './components/teamTable/teamTable.component';
import { TeamForm } from './components/teamForm/teamForm.component';

import { routing } from './team.routing';


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
    Team,
    TeamTable,
    TeamForm
  ],
  providers: [
    TeamService
  ]
})
export class TeamModule { }
