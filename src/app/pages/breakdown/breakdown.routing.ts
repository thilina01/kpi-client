import { Routes, RouterModule }  from '@angular/router';

import { Breakdown } from './breakdown.component';
import { BreakdownForm } from './components/breakdownForm/breakdownForm.component';
import { BreakdownTable } from './components/breakdownTable/breakdownTable.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Breakdown,
    children: [
      { path: 'form', component: BreakdownForm },
      { path: 'form/:id', component: BreakdownForm },
      { path: 'table', component: BreakdownTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
