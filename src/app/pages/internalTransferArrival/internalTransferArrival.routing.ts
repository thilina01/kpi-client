import { Routes, RouterModule } from '@angular/router';

import { InternalTransferArrival } from './internalTransferArrival.component';
import { InternalTransferArrivalForm } from './components/internalTransferArrivalForm/internalTransferArrivalForm.component';
import { InternalTransferArrivalTable } from './components/internalTransferArrivalTable/internalTransferArrivalTable.component';

const routes: Routes = [
  {
    path: '',
    component: InternalTransferArrival,
    children: [
      { path: 'form', component: InternalTransferArrivalForm },
      { path: 'form/:id', component: InternalTransferArrivalForm },
      { path: 'table', component: InternalTransferArrivalTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
