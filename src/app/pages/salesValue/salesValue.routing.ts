import { Routes, RouterModule }  from '@angular/router';

import { SalesValue } from './salesValue.component';
import { SalesValueForm } from './components/salesValueForm/salesValueForm.component';
import { SalesValueTable } from './components/salesValueTable/salesValueTable.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: SalesValue,
    children: [
      { path: 'form', component: SalesValueForm },
      { path: 'form/:id', component: SalesValueForm },
      { path: 'table', component: SalesValueTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
