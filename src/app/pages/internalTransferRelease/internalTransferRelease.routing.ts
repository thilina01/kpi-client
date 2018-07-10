import { Routes, RouterModule } from '@angular/router';

import { InternalTransferRelease } from './internalTransferRelease.component';
import { InternalTransferReleaseForm } from './components/internalTransferReleaseForm/internalTransferReleaseForm.component';
import { InternalTransferReleaseTable } from './components/internalTransferReleaseTable/internalTransferReleaseTable.component';

const routes: Routes = [
  {
    path: '',
    component: InternalTransferRelease,
    children: [
      { path: 'form', component: InternalTransferReleaseForm },
      { path: 'form/:id', component: InternalTransferReleaseForm },
      { path: 'table', component: InternalTransferReleaseTable }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
