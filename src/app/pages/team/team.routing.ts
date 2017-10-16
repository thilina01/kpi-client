import { Routes, RouterModule } from '@angular/router';

import { Team } from './team.component';
import { TeamForm } from './components/teamForm/teamForm.component';
import { TeamTable } from './components/teamTable/teamTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Team,
    children: [
      { path: 'form', component: TeamForm },
      { path: 'form/:id', component: TeamForm },
      { path: 'table', component: TeamTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
