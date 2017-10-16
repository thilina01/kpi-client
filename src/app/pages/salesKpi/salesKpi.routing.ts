import { Routes, RouterModule } from '@angular/router';

import { SalesKpi } from './salesKpi.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: SalesKpi,
    children: [
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
