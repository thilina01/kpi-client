import { Routes, RouterModule }  from '@angular/router';

import { Plan } from './plan.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Plan
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
