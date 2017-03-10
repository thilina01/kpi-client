/*import { Routes, RouterModule }  from '@angular/router';

import { Production } from './production.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Production
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
*/

import { Routes, RouterModule }  from '@angular/router';

import { Production } from './production.component';
import { ProductionForm } from './components/productionForm/productionForm.component';
import { ProductionTable } from './components/productionTable/productionTable.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Production,
    children: [
      { path: 'form', component: ProductionForm },
      { path: 'form/:id', component: ProductionForm },
      { path: 'table', component: ProductionTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
