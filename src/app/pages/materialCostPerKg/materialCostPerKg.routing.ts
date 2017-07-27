import { Routes, RouterModule }  from '@angular/router';

import { MaterialCostPerKg } from './materialCostPerKg.component';
import { MaterialCostPerKgForm } from './components/materialCostPerKgForm/materialCostPerKgForm.component';
import { MaterialCostPerKgTable } from './components/materialCostPerKgTable/materialCostPerKgTable.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: MaterialCostPerKg,
    children: [
      { path: 'form', component: MaterialCostPerKgForm },
      { path: 'form/:id', component: MaterialCostPerKgForm },
      { path: 'table', component: MaterialCostPerKgTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
