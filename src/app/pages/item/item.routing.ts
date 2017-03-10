import { Routes, RouterModule }  from '@angular/router';

import { Item } from './item.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Item
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
