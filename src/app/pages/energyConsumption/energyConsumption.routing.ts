import { Routes, RouterModule } from '@angular/router';

import { EnergyConsumption } from './energyConsumption.component';
import { EnergyConsumptionForm } from './components/energyConsumptionForm/energyConsumptionForm.component';
import { EnergyConsumptionTable } from './components/energyConsumptionTable/energyConsumptionTable.component';

const routes: Routes = [
  {
    path: '',
    component: EnergyConsumption,
    children: [
      { path: 'form', component: EnergyConsumptionForm },
      { path: 'form/:id', component: EnergyConsumptionForm },
      { path: 'table', component: EnergyConsumptionTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
