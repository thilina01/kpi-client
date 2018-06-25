import { Routes, RouterModule } from '@angular/router';

import { SubcontractArrival } from './subcontractArrival.component';
import { SubcontractArrivalForm } from './components/subcontractArrivalForm/subcontractArrivalForm.component';
import { SubcontractArrivalTable } from './components/subcontractArrivalTable/subcontractArrivalTable.component';

const routes: Routes = [
  {
    path: '',
    component: SubcontractArrival,
    children: [
      { path: 'form', component: SubcontractArrivalForm },
      { path: 'form/:id', component: SubcontractArrivalForm },
      { path: 'table', component: SubcontractArrivalTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
