import { Routes, RouterModule } from '@angular/router';

import { EngineeringKpi } from './engineeringKpi.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: EngineeringKpi,
    children: [
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
