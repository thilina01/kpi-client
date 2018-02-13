import { Routes, RouterModule } from '@angular/router';

import { ManpowerSummary } from './manpowerSummary.component';
import { ManpowerSummaryTable } from './components/manpowerSummaryTable/manpowerSummaryTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ManpowerSummary,
    children: [
      { path: 'table', component: ManpowerSummaryTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
