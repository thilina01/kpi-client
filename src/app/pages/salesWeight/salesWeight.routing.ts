import { Routes, RouterModule }  from '@angular/router';

import { SalesWeight } from './salesWeight.component';
import { SalesWeightForm } from './components/salesWeightForm/salesWeightForm.component';
import { SalesWeightTable } from './components/salesWeightTable/salesWeightTable.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: SalesWeight,
    children: [
      { path: 'form', component: SalesWeightForm },
      { path: 'form/:id', component: SalesWeightForm },
      { path: 'table', component: SalesWeightTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
