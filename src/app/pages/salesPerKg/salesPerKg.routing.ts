import { Routes, RouterModule }  from '@angular/router';

import { SalesPerKg } from './salesPerKg.component';
import { SalesPerKgForm } from './components/salesPerKgForm/salesPerKgForm.component';
import { SalesPerKgTable } from './components/salesPerKgTable/salesPerKgTable.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: SalesPerKg,
    children: [
      { path: 'form', component: SalesPerKgForm },
      { path: 'form/:id', component: SalesPerKgForm },
      { path: 'table', component: SalesPerKgTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
