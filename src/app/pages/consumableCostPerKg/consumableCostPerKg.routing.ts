import { Routes, RouterModule }  from '@angular/router';

import { ConsumableCostPerKg } from './consumableCostPerKg.component';
import { ConsumableCostPerKgForm } from './components/consumableCostPerKgForm/consumableCostPerKgForm.component';
import { ConsumableCostPerKgTable } from './components/consumableCostPerKgTable/consumableCostPerKgTable.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ConsumableCostPerKg,
    children: [
      { path: 'form', component: ConsumableCostPerKgForm },
      { path: 'form/:id', component: ConsumableCostPerKgForm },
      { path: 'table', component: ConsumableCostPerKgTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
