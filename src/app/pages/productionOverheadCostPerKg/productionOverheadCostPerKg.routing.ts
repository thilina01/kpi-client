import { Routes, RouterModule }  from '@angular/router';

import { ProductionOverheadCostPerKg } from './productionOverheadCostPerKg.component';
import { ProductionOverheadCostPerKgForm } from './components/productionOverheadCostPerKgForm/productionOverheadCostPerKgForm.component';
import { ProductionOverheadCostPerKgTable } from './components/productionOverheadCostPerKgTable/productionOverheadCostPerKgTable.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ProductionOverheadCostPerKg,
    children: [
      { path: 'form', component: ProductionOverheadCostPerKgForm },
      { path: 'form/:id', component: ProductionOverheadCostPerKgForm },
      { path: 'table', component: ProductionOverheadCostPerKgTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
