import { Routes, RouterModule } from '@angular/router';

import { SubcontractArrivalReject } from './subcontractArrivalReject.component';
import { SubcontractArrivalRejectForm } from './components/subcontractArrivalRejectForm/subcontractArrivalRejectForm.component';
import { SubcontractArrivalRejectTable } from './components/subcontractArrivalRejectTable/subcontractArrivalRejectTable.component';

const routes: Routes = [
  {
    path: '',
    component: SubcontractArrivalReject,
    children: [
      { path: 'form', component: SubcontractArrivalRejectForm },
      { path: 'form/:id', component: SubcontractArrivalRejectForm },
      { path: 'table', component: SubcontractArrivalRejectTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
