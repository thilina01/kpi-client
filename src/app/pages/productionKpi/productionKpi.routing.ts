import { Routes, RouterModule } from '@angular/router';

import { ProductionKpi } from './productionKpi.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ProductionKpi,
    children: [
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
