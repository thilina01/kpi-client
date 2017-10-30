import { Routes, RouterModule } from '@angular/router';

import { ManpowerUtilization } from './manpowerUtilization.component';
import { ManpowerUtilizationTable } from './components/manpowerUtilizationTable/manpowerUtilizationTable.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ManpowerUtilization,
    children: [
      { path: 'table', component: ManpowerUtilizationTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
