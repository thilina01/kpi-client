import { Routes, RouterModule } from '@angular/router';

import { Plan } from './plan.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Plan
  }, {
    path: ':id',
    component: Plan
  }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
