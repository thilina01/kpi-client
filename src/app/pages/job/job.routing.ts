import { Routes, RouterModule }  from '@angular/router';

import { Job } from './job.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Job
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
