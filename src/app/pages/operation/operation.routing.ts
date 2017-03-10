import { Routes, RouterModule }  from '@angular/router';

import { Operation } from './operation.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Operation
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
