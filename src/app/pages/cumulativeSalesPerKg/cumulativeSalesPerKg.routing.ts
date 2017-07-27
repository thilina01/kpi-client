import { Routes, RouterModule }  from '@angular/router';

import { CumulativeSalesPerKg } from './cumulativeSalesPerKg.component';
import { CumulativeSalesPerKgForm } from './components/cumulativeSalesPerKgForm/cumulativeSalesPerKgForm.component';
import { CumulativeSalesPerKgTable } from './components/cumulativeSalesPerKgTable/cumulativeSalesPerKgTable.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CumulativeSalesPerKg,
    children: [
      { path: 'form', component: CumulativeSalesPerKgForm },
      { path: 'form/:id', component: CumulativeSalesPerKgForm },
      { path: 'table', component: CumulativeSalesPerKgTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
