import { Routes, RouterModule } from '@angular/router';

import { ElectricityCostPerKg } from './electricityCostPerKg.component';
import { ElectricityCostPerKgForm } from './components/electricityCostPerKgForm/electricityCostPerKgForm.component';
import { ElectricityCostPerKgTable } from './components/electricityCostPerKgTable/electricityCostPerKgTable.component';

const routes: Routes = [
  {
    path: '',
    component: ElectricityCostPerKg,
    children: [
      { path: 'form', component: ElectricityCostPerKgForm },
      { path: 'form/:id', component: ElectricityCostPerKgForm },
      { path: 'table', component: ElectricityCostPerKgTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
