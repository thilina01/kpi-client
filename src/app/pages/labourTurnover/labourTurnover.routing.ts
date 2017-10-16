import { Routes, RouterModule } from '@angular/router';

import { LabourTurnover } from './labourTurnover.component';
import { LabourTurnoverForm } from './components/labourTurnoverForm/labourTurnoverForm.component';
import { LabourTurnoverTable } from './components/labourTurnoverTable/labourTurnoverTable.component';

const routes: Routes = [
  {
    path: '',
    component: LabourTurnover,
    children: [
      { path: 'form', component: LabourTurnoverForm },
      { path: 'form/:id', component: LabourTurnoverForm },
      { path: 'table', component: LabourTurnoverTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
