import { Routes, RouterModule } from '@angular/router';

import { HumanResourceKpi } from './humanResourceKpi.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: HumanResourceKpi,
    children: [
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
