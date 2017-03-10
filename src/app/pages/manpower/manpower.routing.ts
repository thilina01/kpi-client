import { Routes, RouterModule }  from '@angular/router';

import { Manpower } from './manpower.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Manpower
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
