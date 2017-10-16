import { Routes, RouterModule } from '@angular/router';

import { LabourCostPerKg } from './labourCostPerKg.component';
import { LabourCostPerKgForm } from './components/labourCostPerKgForm/labourCostPerKgForm.component';
import { LabourCostPerKgTable } from './components/labourCostPerKgTable/labourCostPerKgTable.component';

const routes: Routes = [
  {
    path: '',
    component: LabourCostPerKg,
    children: [
      { path: 'form', component: LabourCostPerKgForm },
      { path: 'form/:id', component: LabourCostPerKgForm },
      { path: 'table', component: LabourCostPerKgTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
